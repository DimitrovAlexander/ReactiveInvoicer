using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace ReactiveInvoicer.Models;

public partial class ReactiveInvoiceContext : DbContext
{
    public ReactiveInvoiceContext()
    {
    }

    public ReactiveInvoiceContext(DbContextOptions<ReactiveInvoiceContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Invoice> Invoices { get; set; }

    public virtual DbSet<InvoiceType> InvoiceTypes { get; set; }

    public virtual DbSet<Partner> Partners { get; set; }

    public virtual DbSet<Payment> Payments { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Invoice>(entity =>
        {
            entity.ToTable("INVOICE");

            entity.Property(e => e.InvoiceId)
                .ValueGeneratedOnAdd()
                .HasColumnType("numeric(18, 0)")
                .HasColumnName("INVOICE_ID");
            entity.Property(e => e.InvoiceDate).HasColumnName("INVOCIE_DATE");
            entity.Property(e => e.InvoiceNo)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("INVOCIE_NO");
            entity.Property(e => e.InvoicePayableUntil).HasColumnName("INVOICE_");
            entity.Property(e => e.InvoiceNote)
                .HasMaxLength(400)
                .IsUnicode(false)
                .HasColumnName("INVOICE_NOTE");
            entity.Property(e => e.InvoiceStatus)
                .HasMaxLength(1)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("INVOICE_STATUS");
            entity.Property(e => e.InvoiceType)
                .HasColumnType("numeric(18, 0)")
                .HasColumnName("INVOICE_TYPE");
            entity.Property(e => e.InvoiceValue)
                .HasColumnType("numeric(10, 2)")
                .HasColumnName("INVOICE_VALUE");
            entity.Property(e => e.PartnerId)
                .HasColumnType("numeric(18, 0)")
                .HasColumnName("PARTNER_ID");

            entity.HasOne(d => d.InvoiceTypeNavigation).WithMany(p => p.Invoices)
                .HasForeignKey(d => d.InvoiceType)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_INVOICE_REFERENCE_INVOICE_");

            entity.HasOne(d => d.Partner).WithMany(p => p.Invoices)
                .HasForeignKey(d => d.PartnerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_INVOICE_REFERENCE_PARTNER");
        });

        modelBuilder.Entity<InvoiceType>(entity =>
        {
            entity.HasKey(e => e.TypeId);

            entity.ToTable("INVOICE_TYPE");

            entity.HasIndex(e => e.TypeName, "IDX_INVOICE_TYPE_UQ").IsUnique();

            entity.Property(e => e.TypeId)
                .HasColumnType("numeric(18, 0)")
                .HasColumnName("TYPE_ID");
            entity.Property(e => e.TypeName)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("TYPE_NAME");
        });

        modelBuilder.Entity<Partner>(entity =>
        {
            entity.ToTable("PARTNER");

            entity.Property(e => e.PartnerId)
            .ValueGeneratedOnAdd()
                .HasColumnType("numeric(18, 0)")
                .HasColumnName("PARTNER_ID");
            entity.Property(e => e.PartnerAddress)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("PARTNER_ADDRESS");
            entity.Property(e => e.PartnerBulstat)
                .HasMaxLength(13)
                .IsUnicode(false)
                .HasColumnName("PARTNER_BULSTAT");
            entity.Property(e => e.PartnerEgn)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("PARTNER_EGN");
            entity.Property(e => e.PartnerEmail)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("PARTNER_EMAIL");
            entity.Property(e => e.PartnerLastname)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("PARTNER_LASTNAME");
            entity.Property(e => e.PartnerName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("PARTNER_NAME");
            entity.Property(e => e.PartnerPhone)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("PARTNER_PHONE");
            entity.Property(e => e.PartnerSurname)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("PARTNER_SURNAME");
            entity.Property(e => e.PartnertFullname)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("PARTNERT_FULLNAME");
        });

        modelBuilder.Entity<Payment>(entity =>
        {
            entity.ToTable("PAYMENTS");

            entity.Property(e => e.PaymentId)
                .ValueGeneratedOnAdd()
                .HasColumnType("numeric(18, 0)")
                .HasColumnName("PAYMENT_ID");
            entity.Property(e => e.InvoiceId)
                .HasColumnType("numeric(18, 0)")
                .HasColumnName("INVOICE_ID");
            entity.Property(e => e.PaymentDate).HasColumnName("PAYMENT_DATE");
            entity.Property(e => e.PaymentValue)
                .HasColumnType("numeric(10, 2)")
                .HasColumnName("PAYMENT_VALUE");

            entity.HasOne(d => d.Invoice).WithMany(p => p.Payments)
                .HasForeignKey(d => d.InvoiceId)
                .HasConstraintName("FK_PAYMENTS_REFERENCE_INVOICE");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__USERS__3214EC072C574432");

            entity.ToTable("USERS");

            entity.Property(e => e.Id).HasMaxLength(40);
            entity.Property(e => e.Password).HasMaxLength(40);
            entity.Property(e => e.Role).HasMaxLength(7);
            entity.Property(e => e.Username).HasMaxLength(40);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
