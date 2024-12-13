namespace ReactiveInvoicer.Models.DTOs
{
    public class EditInvoiceDTO
    {
        public int InvoiceTypeId { get; set; } // Нов вид фактура
        public string InvoiceNo { get; set; } // Нов номер на фактура
        public DateTime InvoiceDate { get; set; } // Нова дата на фактура
        public DateTime PayableUntil { get; set; } // Нова дата за плащане
        public decimal InvoiceValue { get; set; } // Нова стойност
        public string? InvoiceNote { get; set; } // Нов коментар
    }
}
