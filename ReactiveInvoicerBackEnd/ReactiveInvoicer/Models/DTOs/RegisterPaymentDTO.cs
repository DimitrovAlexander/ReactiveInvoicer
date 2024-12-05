namespace ReactiveInvoicer.Models.DTOs
{
    public class RegisterPaymentDTO
    {
        public int InvoiceId { get; set; } // ID на фактурата
        public DateOnly PaymentDate { get; set; } // Дата на плащане
        public decimal PaymentValue { get; set; } // Сума на плащане
    }
}

