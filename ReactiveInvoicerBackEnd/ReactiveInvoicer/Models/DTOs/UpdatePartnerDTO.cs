namespace ReactiveInvoicer.Models.DTOs
{
    public class UpdatePartnerDTO
    {

            public string PartnerEgn { get; set; } // ЕГН (за физическо лице)
            public string PartnerBulstat { get; set; } // Булстат (за юридическо лице)

            public string PartnerName { get; set; } // Наименование или име
            public string PartnerSurname { get; set; } // Презиме (ако е физическо лице)
            public string PartnerLastname { get; set; } // Фамилия (ако е физическо лице)
            public string PartnerEmail { get; set; } // Имейл
            public string PartnerPhone { get; set; } // Телефон
            public string PartnerAddress { get; set; } // Адрес
        }

    }

