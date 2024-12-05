using System;
using System.Collections.Generic;

namespace ReactiveInvoicer.Models;

public partial class Invoice
{
    public decimal InvoiceId { get; set; }

    public decimal PartnerId { get; set; }

    public string InvocieNo { get; set; } = null!;

    public DateOnly InvocieDate { get; set; }

    public decimal InvoiceType { get; set; }

    public DateOnly InvoicePayableUntil { get; set; }

    public string InvoiceStatus { get; set; } = null!;

    public decimal InvoiceValue { get; set; }

    public string? InvoiceNote { get; set; }

    public virtual InvoiceType InvoiceTypeNavigation { get; set; } = null!;

    public virtual Partner Partner { get; set; } = null!;

    public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();
}
