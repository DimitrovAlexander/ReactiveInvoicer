using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Humanizer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactiveInvoicer.Models;
using ReactiveInvoicer.Models.DTOs;

namespace ReactiveInvoicer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoicesController : ControllerBase
    {
        private readonly ReactiveInvoiceContext _context;

        public InvoicesController(ReactiveInvoiceContext context)
        {
            _context = context;
        }

        // GET: api/Invoices
        [HttpGet]
        public async Task<IActionResult> GetInvoices()
        {
            var query = _context.Invoices
                .Include(i => i.Partner) // Include related data
                .Include(i => i.InvoiceTypeNavigation)
                .Include(i=>i.Payments)// Include related data
                .AsQueryable();

            // Fetch the results
            var invoices = await query
                .Select(i => new
                {
                    i.InvoiceId,
                    i.InvoiceNo,
                    i.InvoiceDate,
                    i.InvoicePayableUntil,
                    i.InvoiceStatus,
                    i.InvoiceValue,
                    PartnerName = i.Partner.PartnertFullname,
                    InvoiceTypeName = i.InvoiceType

                    
                })
                .ToListAsync();

            return Ok(invoices);
        }

        // GET: api/Invoices/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetInvoiceDetails(int id)
        {
            // Намери фактурата с включени данни за партньор и плащания
            var invoice = await _context.Invoices
                .Include(i => i.Partner)
                .Include(i => i.Payments)
                .FirstOrDefaultAsync(i => i.InvoiceId == id);

            if (invoice == null)
                return NotFound($"Invoice with ID {id} not found.");
            // Изчисляване на сума на плащанията и остатъчно задължение
            var totalPayments = invoice.Payments.Sum(p => p.PaymentValue);
            var remainingBalance = invoice.InvoiceValue - totalPayments;

            // Изчисляване на дни закъснение
            int overdueDays = 0;
            if (remainingBalance > 0 && (DateTime.UtcNow) > invoice.InvoicePayableUntil)
            {
                overdueDays = (DateTime.UtcNow.Date - invoice.InvoicePayableUntil.Date).Days;
            }
            string invoiceTypeName = _context.InvoiceTypes.FirstOrDefault(x => x.TypeId == invoice.InvoiceType).TypeName;

                // Създаване на обект с резултатите
                var details = new
            {
                invoice.InvoiceId,
                invoice.InvoiceNo,
                invoice.InvoiceDate,
                invoice.InvoicePayableUntil,
                invoice.InvoiceValue,
                invoiceTypeName,
                TotalPayments = totalPayments,
                RemainingBalance = remainingBalance,
                OverdueDays = overdueDays,
                PartnerName = invoice.Partner.PartnertFullname,
                InvoiceStatus = invoice.InvoiceStatus,
                InvoiceNote = invoice.InvoiceNote
            };

            return Ok(details);
        }

        // PUT: api/Invoices/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> EditInvoice(int id, [FromBody] EditInvoiceDTO model)
        {
            // Намери фактурата
            var invoice = await _context.Invoices
                .Include(i => i.Payments) // Зареждане на плащанията за проверка
                .FirstOrDefaultAsync(i => i.InvoiceId == id);

            if (invoice == null)
                return NotFound($"Invoice with ID {id} not found.");

            // Проверка дали по фактурата има регистрирани плащания
            if (invoice.Payments.Any())
                return BadRequest("Invoice cannot be edited because there are registered payments.");

            // Актуализиране на данните за фактурата
            invoice.InvoiceType = model.InvoiceTypeId;
            invoice.InvoiceNo = model.InvoiceNo;
            invoice.InvoiceDate = model.InvoiceDate;
            invoice.InvoicePayableUntil = model.PayableUntil;
            invoice.InvoiceValue = model.InvoiceValue;
            invoice.InvoiceNote = model.InvoiceNote;

            // Записване на промените
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Invoice updated successfully." });
        }
        [HttpPut("{id}/updateStatus")]
        public async Task<IActionResult> EditInvoiceStatus(int id, [FromBody] EditInvoiceStatusDTO model)
        {
            // Намери фактурата
            var invoice = await _context.Invoices
                .FirstOrDefaultAsync(i => i.InvoiceId == id);

            if (invoice == null)
                return NotFound($"Invoice with ID {id} not found.");
           

            // Актуализиране на данните за фактурата
           invoice.InvoiceStatus= model.status;

            // Записване на промените
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Invoice status updated successfully." });
        }

        // POST: api/Invoices
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<IActionResult> RegisterInvoice([FromBody] RegisterInvoiceDTO model)
        {
            // Валидация на входните данни
            if (model == null)
                return BadRequest("Invalid invoice data.");
            if (string.IsNullOrEmpty(model.InvoiceNo))
                return BadRequest("InvoiceNo is empty");

            if (model.InvoiceValue <= 0)
                return BadRequest("Invoice value must be greater than zero.");

            if (model.PayableUntil < model.InvoiceDate)
                return BadRequest("Payable date cannot be earlier than the invoice date.");

            // Проверка и/или създаване на контрагент
            Partner partner;
            if (model.PartnerId.HasValue)
            {
                partner = await _context.Partners.FindAsync(model.PartnerId.Value);
                if (partner == null)
                    return NotFound($"Partner with ID {model.PartnerId} not found.");
            }
            else
            {
                // Създаване на нов контрагент
                partner = new Partner
                {
                    PartnerBulstat=model.PartnerBulstat,
                    PartnerEgn=model.PartnerEgn,
                    PartnerName = model.PartnerName,
                    PartnerSurname = model.PartnerSurname,
                    PartnerLastname = model.PartnerLastname,
                    PartnertFullname = $"{model.PartnerName} {model.PartnerSurname} {model.PartnerLastname}".Trim(),
                    PartnerEmail = model.PartnerEmail,
                    PartnerPhone = model.PartnerPhone,
                    PartnerAddress = model.PartnerAddress
                };

                _context.Partners.Add(partner);
                await _context.SaveChangesAsync();
            }

            // Създаване на нова фактура
            var invoice = new Invoice
            {
                PartnerId = partner.PartnerId,
                InvoiceType = model.InvoiceTypeId,
                InvoiceNo = model.InvoiceNo,
                InvoiceDate = model.InvoiceDate,
                InvoicePayableUntil = model.PayableUntil,
                InvoiceStatus = "N", // Установяваме статуса на "Неплатена"
                InvoiceValue = model.InvoiceValue,
                InvoiceNote = model.InvoiceNote
            };

            _context.Invoices.Add(invoice);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Invoice registered successfully.", InvoiceId = invoice.InvoiceId });
        }
        [HttpPost("payment")]
        public async Task<IActionResult> RegisterPayment([FromBody] RegisterPaymentDTO model)
        {
            // Намиране на фактурата
            var invoice = await _context.Invoices
                .FirstOrDefaultAsync(i => i.InvoiceId == model.InvoiceId);

            if (invoice == null)
                return NotFound($"Invoice with ID {model.InvoiceId} not found.");

            // Валидация на датата на плащане
            if (model.PaymentDate < invoice.InvoiceDate)
                return BadRequest("Payment date cannot be earlier than the invoice date.");

            // Валидация на сумата на плащане
            if (model.PaymentValue <= 0)
                return BadRequest("Payment value must be greater than zero.");

            // Регистриране на ново плащане
            var payment = new Payment
            {
                InvoiceId = model.InvoiceId,
                PaymentDate = model.PaymentDate,
                PaymentValue = model.PaymentValue
            };

            _context.Payments.Add(payment);
            if (invoice.Payments.Sum(p => p.PaymentValue) + model.PaymentValue >= invoice.InvoiceValue)
            {
                invoice.InvoiceStatus = "P"; // Update status to Paid
                _context.Invoices.Update(invoice);
            }
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Payment registered successfully.", PaymentId = payment.PaymentId });
        }

        [HttpGet("overdue")]
        public async Task<IActionResult> GetOverdueInvoices()
        {
            // Изчисли текущата дата
            DateTime currentDate =(DateTime.UtcNow.Date);

            // Извличане на фактури с недостатъчни плащания и изтекла дата за плащане
            var overdueInvoices = await _context.Invoices
                .Include(i => i.Partner) // Зарежда свързания контрагент
                .Include(i => i.Payments) // Зарежда регистрираните плащания
                .Where(i => i.InvoicePayableUntil <= currentDate && // Платима до е настъпила
                            i.Payments.Sum(p => p.PaymentValue) < i.InvoiceValue) // Плащанията са недостатъчни
                .Select(i => new
                {
                    i.InvoiceId,
                    i.InvoiceNo,
                    i.InvoiceDate,
                    i.InvoicePayableUntil,
                    i.InvoiceValue,
                    TotalPayments = i.Payments.Sum(p => p.PaymentValue),
                    RemainingBalance = i.InvoiceValue - i.Payments.Sum(p => p.PaymentValue),
                    OverdueDays = (currentDate - i.InvoicePayableUntil).Days,
                    PartnerName = i.Partner.PartnertFullname,
                    InvoiceStatus = i.InvoiceStatus
                })
                .ToListAsync();

            return Ok(overdueInvoices);
        }

        private bool InvoiceExists(decimal id)
        {
            return _context.Invoices.Any(e => e.InvoiceId == id);
        }
    }
}
