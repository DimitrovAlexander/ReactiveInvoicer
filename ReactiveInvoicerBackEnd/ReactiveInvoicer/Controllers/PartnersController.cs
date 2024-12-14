        using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactiveInvoicer.Models;
using ReactiveInvoicer.Models.DTOs;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace ReactiveInvoicer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PartnersController : ControllerBase
    {
        private readonly ReactiveInvoiceContext _context;

        public PartnersController(ReactiveInvoiceContext context)
        {
            _context = context;
        }

        // GET: api/Partners
        [HttpGet]
        [HttpGet("search")]
        public async Task<IActionResult> SearchPartners(
    [FromQuery] string? egn,
    [FromQuery] string? bulstat,
    [FromQuery] string? clientType,
    [FromQuery] string? fullName,
    [FromQuery] string? name,
    [FromQuery] string? email)
        {
            var query = _context.Partners.AsQueryable();

           
            // Извличане на резултатите
            var result = await query
                .Select(p => new
                {
                    p.PartnerId,
                    p.PartnertFullname,
                    p.PartnerEgn,
                    p.PartnerBulstat,
                    p.PartnerEmail,
                    p.PartnerPhone,
                    p.PartnerAddress
                })
                .ToListAsync();

            return Ok(result);
        }

        // GET: api/Partners/5

        [HttpGet("{partnerId}")]
        public async Task<IActionResult> GetPartnerDetails(decimal partnerId)
        {
            // Намиране на контрагент
            var partner = await _context.Partners.Include(i=>i.Invoices).FirstOrDefaultAsync(x=>x.PartnerId==partnerId);

            if (partner == null)
                return NotFound($"Partner with ID {partnerId} not found.");

            // Създаване на обект с данните за контрагента
            var result = new
            {
                partner.PartnerId,
                partner.PartnerEgn,
                partner.PartnerBulstat,

                partner.PartnerName,
                partner.PartnerSurname,
                partner.PartnerLastname,
                partner.PartnertFullname,
                partner.PartnerEmail,
                partner.PartnerPhone,
                partner.PartnerAddress,
                invoices = partner.Invoices.Select(i => new
                {
                    i.InvoiceId,
                    i.InvoiceNo,
                    i.InvoiceDate,
                    i.InvoicePayableUntil,
                    i.InvoiceStatus,
                    i.InvoiceValue,
                    InvoiceTypeName = i.InvoiceType
                }).ToList() // Конвертираме го в списък
            };

            return Ok(result);
        }


        // PUT: api/Partners/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{partnerId}")]
        public async Task<IActionResult> UpdatePartner(decimal partnerId, [FromBody] UpdatePartnerDTO model)
        {
            // Намиране на контрагента
            var partner = await _context.Partners.FindAsync(partnerId);

            if (partner == null)
                return NotFound($"Partner with ID {partnerId} not found.");

            // Валидация на типа клиент
            

            // Актуализиране на данните за контрагента
            partner.PartnerEgn = model.PartnerEgn;
            partner.PartnerBulstat = model.PartnerBulstat;

            partner.PartnerName = model.PartnerName;
            partner.PartnerSurname = model.PartnerSurname;
            partner.PartnerLastname = model.PartnerLastname;
            partner.PartnerEmail = model.PartnerEmail;
            partner.PartnerPhone = model.PartnerPhone;
            partner.PartnerAddress = model.PartnerAddress;

            // Обновяване на пълното име, ако е физическо лице
            if (model.PartnerEgn != "")
            {
                partner.PartnertFullname = $"{model.PartnerName} {model.PartnerSurname} {model.PartnerLastname}".Trim();
            }
            else
            {
                partner.PartnertFullname = model.PartnerName; // За юридическо лице
            }

            // Записване на промените
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Partner updated successfully." });
        }
        [HttpGet("details/{partnerId}")]
        public async Task<IActionResult> GetPartnerDetailsWithInvoices(decimal partnerId)
        {
            // Намери контрагента
            var partner = await _context.Partners
                .Include(p => p.Invoices) // Зареждане на фактурите
                .ThenInclude(i => i.Payments) // Зареждане на плащанията по фактурите
                .FirstOrDefaultAsync(p => p.PartnerId == partnerId);

            if (partner == null)
                return NotFound($"Partner with ID {partnerId} not found.");

            // Обобщена информация за фактурите
            var totalInvoices = partner.Invoices.Count;
            var totalInvoiceValue = partner.Invoices.Sum(i => i.InvoiceValue);
            var paidInvoices = partner.Invoices.Count(i => i.InvoiceStatus == "P");
            var unpaidInvoices = partner.Invoices.Count(i => i.InvoiceStatus == "U");
            var totalRemainingBalance = partner.Invoices
                .Where(i => i.InvoiceStatus == "U") // Неплатени фактури
                .Sum(i => i.InvoiceValue - i.Payments.Sum(p => p.PaymentValue)); // Остатък по тях

            // Данни за контрагента и фактурите
            var result = new
            {
                partner.PartnerId,
                partner.PartnerEgn,
                partner.PartnerBulstat,
                partner.PartnerName,
                partner.PartnerSurname,
                partner.PartnerLastname,
                partner.PartnertFullname,
                partner.PartnerEmail,
                partner.PartnerPhone,
                partner.PartnerAddress,
                InvoiceSummary = new
                {
                    TotalInvoices = totalInvoices,
                    TotalInvoiceValue = totalInvoiceValue,
                    PaidInvoices = paidInvoices,
                    UnpaidInvoices = unpaidInvoices,
                    TotalRemainingBalance = totalRemainingBalance
                }
            };

            return Ok(result);
        }


        // POST: api/Partners
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("{partnerId}/invoices")]
        public async Task<IActionResult> RegisterInvoiceForPartner(decimal partnerId, [FromBody] RegisterInvoiceForPartnerDTO model)
        {
            // Намиране на контрагента
            var partner = await _context.Partners.FindAsync(partnerId);

            if (partner == null)
                return NotFound($"Partner with ID {partnerId} not found.");

            // Валидация на данните за фактурата
            if (model.PayableUntil < model.InvoiceDate)
                return BadRequest("The payable date cannot be earlier than the invoice date.");

            if (model.InvoiceValue <= 0)
                return BadRequest("Invoice value must be greater than zero.");

            // Създаване на нова фактура
            var invoice = new Invoice
            {
                PartnerId = partner.PartnerId,
                InvoiceType = model.InvoiceTypeId,
                InvoiceNo = model.InvoiceNo,
                InvoiceDate = model.InvoiceDate,
                InvoicePayableUntil = model.PayableUntil,
                InvoiceValue = model.InvoiceValue,
                InvoiceNote = model.InvoiceNote,
                InvoiceStatus = "U" // По подразбиране статусът е "Неплатена"
            };

            // Добавяне във базата данни
            _context.Invoices.Add(invoice);
            await _context.SaveChangesAsync();

            // Връщане на успешен резултат
            return Ok(new { Message = "Invoice registered successfully.", InvoiceId = invoice.InvoiceId });
        }
        // DELETE: api/Partners/5


        private bool PartnerExists(decimal id)
        {
            return _context.Partners.Any(e => e.PartnerId == id);
        }
    }
}
