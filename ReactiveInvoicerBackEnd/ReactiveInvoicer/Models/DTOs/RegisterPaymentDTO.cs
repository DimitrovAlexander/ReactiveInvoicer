namespace ReactiveInvoicer.Models.DTOs
{
    public class RegisterPaymentDTO
    {
        public int InvoiceId { get; set; } // ID на фактурата
        public DateTime PaymentDate { get; set; } // Дата на плащане
        public decimal PaymentValue { get; set; } // Сума на плащане
    }
}

