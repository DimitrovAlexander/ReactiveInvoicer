namespace ReactiveInvoicer.Models.DTOs
{
    public class RegisterInvoiceDTO
    {
        public decimal? PartnerId { get; set; } // ID на съществуващ контрагент (ако има)
        public string? PartnerName { get; set; } // За нов контрагент
        public string? PartnerSurname { get; set; }
        public string? PartnerLastname { get; set; }
        public string? PartnerEmail { get; set; }
        public string? PartnerPhone { get; set; }
        public string? PartnerAddress { get; set; }
        public int InvoiceTypeId { get; set; } // ID на типа фактура
        public string InvoiceNo { get; set; } // Номер на фактура
        public DateTime InvoiceDate { get; set; } // Дата на фактура
        public DateTime PayableUntil { get; set; } // Платима до
        public decimal InvoiceValue { get; set; } // Стойност
        public string? InvoiceNote { get; set; } // Коментар
    }
}
