using System;
using System.Collections.Generic;

namespace ReactiveInvoicer.Models;

public partial class InvoiceType
{
    public decimal TypeId { get; set; }

    public string TypeName { get; set; } = null!;

    public virtual ICollection<Invoice> Invoices { get; set; } = new List<Invoice>();
}
