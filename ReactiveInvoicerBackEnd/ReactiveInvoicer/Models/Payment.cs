using System;
using System.Collections.Generic;

namespace ReactiveInvoicer.Models;

public partial class Payment
{
    public decimal PaymentId { get; set; }

    public decimal? InvoiceId { get; set; }

    public DateTime PaymentDate { get; set; }

    public decimal PaymentValue { get; set; }

    public virtual Invoice? Invoice { get; set; }
}
