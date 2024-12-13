namespace ReactiveInvoicer.Models.DTOs
{
    public class RegisterInvoiceForPartnerDTO
    {

    

            public int InvoiceTypeId { get; set; } // Вид фактура
            public string InvoiceNo { get; set; } // Номер на фактура
            public DateTime InvoiceDate { get; set; } // Дата на фактура
            public DateTime PayableUntil { get; set; } // Дата платима до
            public decimal InvoiceValue { get; set; } // Стойност на фактурата
            public string? InvoiceNote { get; set; } // Забележка към фактурата
        

    }
}
