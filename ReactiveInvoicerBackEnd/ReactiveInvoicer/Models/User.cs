using System;
using System.Collections.Generic;

namespace ReactiveInvoicer.Models;

public partial class User
{
    public string Id { get; set; } = null!;

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? Username { get; set; }

    public string? Password { get; set; }

    public string? Role { get; set; }
}
