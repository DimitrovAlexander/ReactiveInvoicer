using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactiveInvoicer.Models;

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
        public async Task<ActionResult<IEnumerable<Partner>>> GetPartners()
        {
            return await _context.Partners.ToListAsync();
        }

        // GET: api/Partners/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Partner>> GetPartner(decimal id)
        {
            var partner = await _context.Partners.FindAsync(id);

            if (partner == null)
            {
                return NotFound();
            }

            return partner;
        }

        // PUT: api/Partners/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPartner(decimal id, Partner partner)
        {
            if (id != partner.PartnerId)
            {
                return BadRequest();
            }

            _context.Entry(partner).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PartnerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Partners
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Partner>> PostPartner(Partner partner)
        {
            _context.Partners.Add(partner);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (PartnerExists(partner.PartnerId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetPartner", new { id = partner.PartnerId }, partner);
        }

        // DELETE: api/Partners/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePartner(decimal id)
        {
            var partner = await _context.Partners.FindAsync(id);
            if (partner == null)
            {
                return NotFound();
            }

            _context.Partners.Remove(partner);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PartnerExists(decimal id)
        {
            return _context.Partners.Any(e => e.PartnerId == id);
        }
    }
}
