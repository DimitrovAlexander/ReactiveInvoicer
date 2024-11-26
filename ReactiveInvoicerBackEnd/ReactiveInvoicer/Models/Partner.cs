using System;
using System.Collections.Generic;

namespace ReactiveInvoicer.Models;

public partial class Partner
{
    public decimal PartnerId { get; set; }

    public string? PartnerName { get; set; }

    public string? PartnerSurname { get; set; }

    public string? PartnerLastname { get; set; }

    public string? PartnertFullname { get; set; }

    public string? PartnerEgn { get; set; }

    public string? PartnerBulstat { get; set; }

    public string? PartnerEmail { get; set; }

    public string? PartnerPhone { get; set; }

    public string? PartnerAddress { get; set; }

    public virtual ICollection<Invoice> Invoices { get; set; } = new List<Invoice>();
}
