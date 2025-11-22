using Microsoft.EntityFrameworkCore;
using VoiceOfChrist.API.Models;

namespace VoiceOfChrist.API.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) 
        : base(options)
    {
    }

    public DbSet<Branch> Branches { get; set; }
    public DbSet<Pastor> Pastors { get; set; }
    public DbSet<Event> Events { get; set; }
    public DbSet<ChurchInfo> ChurchInfo { get; set; }
    public DbSet<Admin> Admins { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Branch configuration
        modelBuilder.Entity<Branch>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(200);
            entity.Property(e => e.Address).IsRequired().HasMaxLength(500);
            entity.Property(e => e.City).IsRequired().HasMaxLength(100);
        });

        // Pastor configuration
        modelBuilder.Entity<Pastor>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.FirstName).IsRequired().HasMaxLength(100);
            entity.Property(e => e.LastName).IsRequired().HasMaxLength(100);
            entity.HasOne(e => e.Branch)
                .WithMany(b => b.Pastors)
                .HasForeignKey(e => e.BranchId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        // Event configuration
        modelBuilder.Entity<Event>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Title).IsRequired().HasMaxLength(300);
            entity.HasOne(e => e.Branch)
                .WithMany(b => b.Events)
                .HasForeignKey(e => e.BranchId)
                .OnDelete(DeleteBehavior.SetNull);
        });

        // ChurchInfo configuration
        modelBuilder.Entity<ChurchInfo>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Mission).IsRequired();
            entity.Property(e => e.Vision).IsRequired();
            entity.Property(e => e.Beliefs).IsRequired();
        });

        // Admin configuration
        modelBuilder.Entity<Admin>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Username).IsRequired().HasMaxLength(50);
            entity.Property(e => e.Email).IsRequired().HasMaxLength(100);
            entity.HasIndex(e => e.Username).IsUnique();
            entity.HasIndex(e => e.Email).IsUnique();
        });

        // Seed initial data
        SeedData(modelBuilder);
    }

    private void SeedData(ModelBuilder modelBuilder)
    {
        // Seed default church info
        modelBuilder.Entity<ChurchInfo>().HasData(new ChurchInfo
        {
            Id = 1,
            Mission = "To spread the Gospel of Jesus Christ and make disciples of all nations.",
            Vision = "A thriving community of believers living out God's love and transforming lives.",
            Beliefs = "We believe in the Holy Trinity - God the Father, Son, and Holy Spirit. We believe in salvation through Jesus Christ alone. We believe in the authority of the Bible as God's Word.",
            History = "Voice of Christ Church was founded with a mission to bring hope and faith to our community.",
            ContactEmail = "info@voiceofchrist.org",
            ContactPhone = "+27 11 123 4567",
            FoundedDate = new DateTime(2000, 1, 1),
            UpdatedAt = DateTime.UtcNow
        });

        // Seed default admin (password: Admin123!)
        modelBuilder.Entity<Admin>().HasData(new Admin
        {
            Id = 1,
            Username = "admin",
            Email = "admin@voiceofchrist.org",
            FullName = "System Administrator",
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin123!"),
            IsActive = true,
            CreatedAt = DateTime.UtcNow
        });

        // Seed sample branches
        modelBuilder.Entity<Branch>().HasData(
            new Branch
            {
                Id = 1,
                Name = "Johannesburg Central",
                Address = "123 Main Street",
                City = "Johannesburg",
                Province = "Gauteng",
                PhoneNumber = "+27 11 123 4567",
                Email = "jhb@voiceofchrist.org",
                EstablishedDate = new DateTime(2000, 1, 15),
                IsActive = true
            },
            new Branch
            {
                Id = 2,
                Name = "Pretoria North",
                Address = "456 Church Avenue",
                City = "Pretoria",
                Province = "Gauteng",
                PhoneNumber = "+27 12 345 6789",
                Email = "pretoria@voiceofchrist.org",
                EstablishedDate = new DateTime(2005, 6, 10),
                IsActive = true
            },
            new Branch
            {
                Id = 3,
                Name = "Durban Beachfront",
                Address = "789 Ocean Drive",
                City = "Durban",
                Province = "KwaZulu-Natal",
                PhoneNumber = "+27 31 987 6543",
                Email = "durban@voiceofchrist.org",
                EstablishedDate = new DateTime(2010, 3, 20),
                IsActive = true
            },
            new Branch
            {
                Id = 4,
                Name = "Cape Town Gardens",
                Address = "15 Garden Street, Gardens",
                City = "Cape Town",
                Province = "Western Cape",
                PhoneNumber = "+27 21 456 7890",
                Email = "capetown@voiceofchrist.org",
                EstablishedDate = new DateTime(2008, 9, 5),
                IsActive = true
            },
            new Branch
            {
                Id = 5,
                Name = "Bloemfontein Central",
                Address = "88 Nelson Mandela Drive",
                City = "Bloemfontein",
                Province = "Free State",
                PhoneNumber = "+27 51 234 5678",
                Email = "bloemfontein@voiceofchrist.org",
                EstablishedDate = new DateTime(2012, 4, 14),
                IsActive = true
            },
            new Branch
            {
                Id = 6,
                Name = "Port Elizabeth Bayview",
                Address = "22 Marine Drive, Summerstrand",
                City = "Port Elizabeth",
                Province = "Eastern Cape",
                PhoneNumber = "+27 41 567 8901",
                Email = "pe@voiceofchrist.org",
                EstablishedDate = new DateTime(2015, 11, 8),
                IsActive = true
            },
            new Branch
            {
                Id = 7,
                Name = "Polokwane Gateway",
                Address = "45 Schoeman Street",
                City = "Polokwane",
                Province = "Limpopo",
                PhoneNumber = "+27 15 678 9012",
                Email = "polokwane@voiceofchrist.org",
                EstablishedDate = new DateTime(2018, 2, 18),
                IsActive = true
            },
            new Branch
            {
                Id = 8,
                Name = "Nelspruit Riverside",
                Address = "12 Riverside Mall, Nelspruit",
                City = "Nelspruit",
                Province = "Mpumalanga",
                PhoneNumber = "+27 13 789 0123",
                Email = "nelspruit@voiceofchrist.org",
                EstablishedDate = new DateTime(2016, 7, 25),
                IsActive = true
            }
        );

        // Seed sample pastors
        modelBuilder.Entity<Pastor>().HasData(
            new Pastor
            {
                Id = 1,
                FirstName = "John",
                LastName = "Mthembu",
                Title = "Senior Pastor",
                Bio = "Pastor John has been serving the Lord for over 20 years with a heart for evangelism and discipleship.",
                Email = "john.mthembu@voiceofchrist.org",
                PhoneNumber = "+27 82 123 4567",
                OrdainedDate = new DateTime(2003, 8, 15),
                BranchId = 1,
                IsActive = true
            },
            new Pastor
            {
                Id = 2,
                FirstName = "Sarah",
                LastName = "Van Der Merwe",
                Title = "Senior Pastor",
                Bio = "Pastor Sarah is passionate about worship and community outreach programs.",
                Email = "sarah.vdm@voiceofchrist.org",
                PhoneNumber = "+27 82 234 5678",
                OrdainedDate = new DateTime(2007, 5, 20),
                BranchId = 2,
                IsActive = true
            },
            new Pastor
            {
                Id = 3,
                FirstName = "David",
                LastName = "Naidoo",
                Title = "Youth Pastor",
                Bio = "Pastor David works with the youth, inspiring the next generation to live for Christ.",
                Email = "david.naidoo@voiceofchrist.org",
                PhoneNumber = "+27 82 345 6789",
                OrdainedDate = new DateTime(2012, 11, 10),
                BranchId = 3,
                IsActive = true
            },
            new Pastor
    {
        Id = 4,
        FirstName = "Grace",
        LastName = "Williams",
        Title = "Senior Pastor",
        Bio = "Pastor Grace has a passion for prayer ministry and women's empowerment in the church.",
        Email = "grace.williams@voiceofchrist.org",
        PhoneNumber = "+27 82 456 7890",
        OrdainedDate = new DateTime(2009, 3, 12),
        BranchId = 4,
        IsActive = true
    },
            new Pastor
  {
     Id = 5,
        FirstName = "Michael",
            LastName = "Botha",
     Title = "Associate Pastor",
              Bio = "Pastor Michael specializes in children's ministry and family counseling.",
          Email = "michael.botha@voiceofchrist.org",
            PhoneNumber = "+27 82 567 8901",
  OrdainedDate = new DateTime(2014, 9, 8),
       BranchId = 4,
      IsActive = true
  },
     new Pastor
            {
        Id = 6,
  FirstName = "Thabo",
        LastName = "Molefi",
        Title = "Senior Pastor",
             Bio = "Pastor Thabo has a heart for community development and social justice ministry.",
          Email = "thabo.molefi@voiceofchrist.org",
        PhoneNumber = "+27 82 678 9012",
              OrdainedDate = new DateTime(2013, 6, 22),
                BranchId = 5,
  IsActive = true
            },
            new Pastor
     {
       Id = 7,
            FirstName = "Elizabeth",
       LastName = "Jacobs",
          Title = "Senior Pastor",
        Bio = "Pastor Elizabeth is dedicated to missions and cross-cultural ministry.",
       Email = "elizabeth.jacobs@voiceofchrist.org",
       PhoneNumber = "+27 82 789 0123",
             OrdainedDate = new DateTime(2016, 1, 30),
   BranchId = 6,
         IsActive = true
            },
        new Pastor
            {
   Id = 8,
FirstName = "Peter",
     LastName = "Maluleke",
          Title = "Senior Pastor",
            Bio = "Pastor Peter focuses on discipleship training and leadership development.",
           Email = "peter.maluleke@voiceofchrist.org",
             PhoneNumber = "+27 82 890 1234",
         OrdainedDate = new DateTime(2019, 4, 7),
        BranchId = 7,
   IsActive = true
         },
 new Pastor
   {
          Id = 9,
       FirstName = "Mary",
  LastName = "Ndlovu",
        Title = "Women's Pastor",
   Bio = "Pastor Mary leads the women's ministry with passion for mentorship and spiritual growth.",
    Email = "mary.ndlovu@voiceofchrist.org",
   PhoneNumber = "+27 82 901 2345",
             OrdainedDate = new DateTime(2017, 8, 19),
BranchId = 8,
                IsActive = true
    },
   new Pastor
  {
     Id = 10,
    FirstName = "James",
      LastName = "Kruger",
       Title = "Senior Pastor",
                Bio = "Pastor James brings experience in church planting and pastoral care to our community.",
  Email = "james.kruger@voiceofchrist.org",
        PhoneNumber = "+27 82 012 3456",
  OrdainedDate = new DateTime(2017, 12, 3),
       BranchId = 8,
   IsActive = true
 }
        );

        // Seed sample events
        modelBuilder.Entity<Event>().HasData(
  new Event
            {
  Id = 1,
     Title = "Easter Sunday Celebration",
       Description = "Join us for a powerful Easter Sunday service celebrating the resurrection of our Lord Jesus Christ.",
      EventDate = new DateTime(2025, 4, 20, 9, 0, 0),
     Location = "All Branches",
     Type = EventType.Service,
     Status = EventStatus.Upcoming,
      CreatedAt = DateTime.UtcNow
   },
  new Event
      {
        Id = 2,
        Title = "Youth Conference 2025",
     Description = "An exciting youth conference with worship, teachings, and fellowship.",
    EventDate = new DateTime(2025, 7, 15, 18, 0, 0),
   EndDate = new DateTime(2025, 7, 17, 20, 0, 0),
 Location = "Johannesburg Central",
 Type = EventType.Youth,
            Status = EventStatus.Upcoming,
    BranchId = 1,
       CreatedAt = DateTime.UtcNow
  },
            new Event
      {
    Id = 3,
Title = "Christmas Carol Service",
     Description = "A beautiful evening of Christmas carols and celebration of Christ's birth.",
 EventDate = new DateTime(2024, 12, 24, 19, 0, 0),
         Location = "All Branches",
         Type = EventType.Service,
      Status = EventStatus.Completed,
         CreatedAt = DateTime.UtcNow.AddMonths(-2)
  },
  new Event
    {
       Id = 4,
      Title = "Women's Retreat Weekend",
     Description = "A transformative weekend retreat for women focused on spiritual growth, fellowship, and renewal.",
       EventDate = new DateTime(2025, 3, 8, 9, 0, 0),
    EndDate = new DateTime(2025, 3, 10, 16, 0, 0),
    Location = "Cape Town Gardens",
    Type = EventType.Women,
    Status = EventStatus.Upcoming,
     BranchId = 4,
    CreatedAt = DateTime.UtcNow
      },
   new Event
            {
    Id = 5,
    Title = "Men's Breakfast Prayer Meeting",
                Description = "Monthly men's breakfast meeting with prayer, fellowship and discussion of God's Word.",
       EventDate = new DateTime(2025, 2, 15, 7, 0, 0),
      EndDate = new DateTime(2025, 2, 15, 9, 0, 0),
        Location = "Pretoria North",
        Type = EventType.Men,
        Status = EventStatus.Upcoming,
     BranchId = 2,
       CreatedAt = DateTime.UtcNow
   },
       new Event
   {
       Id = 6,
          Title = "Children's Fun Day",
   Description = "A day filled with games, activities, Bible stories and fun for all children in our community.",
EventDate = new DateTime(2025, 4, 5, 10, 0, 0),
  EndDate = new DateTime(2025, 4, 5, 15, 0, 0),
      Location = "Durban Beachfront",
          Type = EventType.Children,
     Status = EventStatus.Upcoming,
        BranchId = 3,
     CreatedAt = DateTime.UtcNow
    },
    new Event
  {
     Id = 7,
  Title = "Community Outreach Day",
Description = "Join us as we serve our community with food distribution, health checks, and prayer ministry.",
  EventDate = new DateTime(2025, 2, 28, 8, 0, 0),
          EndDate = new DateTime(2025, 2, 28, 16, 0, 0),
          Location = "Bloemfontein Central",
  Type = EventType.Outreach,
        Status = EventStatus.Upcoming,
   BranchId = 5,
        CreatedAt = DateTime.UtcNow
   },
  new Event
 {
    Id = 8,
     Title = "Healing & Deliverance Service",
     Description = "Special service focused on prayer for healing and deliverance. Come expecting God's miraculous power.",
      EventDate = new DateTime(2025, 3, 21, 18, 30, 0),
     EndDate = new DateTime(2025, 3, 21, 21, 0, 0),
         Location = "Port Elizabeth Bayview",
         Type = EventType.Prayer,
Status = EventStatus.Upcoming,
    BranchId = 6,
       CreatedAt = DateTime.UtcNow
          },
     new Event
   {
        Id = 9,
       Title = "Annual Church Conference",
     Description = "Our annual conference bringing together all branches for worship, teaching, and fellowship.",
EventDate = new DateTime(2025, 8, 22, 9, 0, 0),
      EndDate = new DateTime(2025, 8, 25, 17, 0, 0),
    Location = "Johannesburg Central - Main Auditorium",
    Type = EventType.Conference,
       Status = EventStatus.Upcoming,
      BranchId = 1,
       CreatedAt = DateTime.UtcNow
  },
     new Event
     {
   Id = 10,
     Title = "New Members Welcome Service",
        Description = "Special service to welcome and celebrate new members joining our church family.",
      EventDate = new DateTime(2025, 3, 2, 10, 0, 0),
      EndDate = new DateTime(2025, 3, 2, 12, 0, 0),
     Location = "Polokwane Gateway",
      Type = EventType.General,
   Status = EventStatus.Upcoming,
     BranchId = 7,
        CreatedAt = DateTime.UtcNow
      },
 new Event
        {
    Id = 11,
     Title = "Couples Marriage Enrichment Seminar",
        Description = "A seminar designed to strengthen marriages through biblical principles and practical advice.",
              EventDate = new DateTime(2025, 2, 14, 15, 0, 0),
     EndDate = new DateTime(2025, 2, 14, 18, 0, 0),
          Location = "Nelspruit Riverside",
 Type = EventType.General,
        Status = EventStatus.Upcoming,
 BranchId = 8,
   CreatedAt = DateTime.UtcNow
            },
  new Event
          {
     Id = 12,
        Title = "Midnight Prayer Vigil",
    Description = "Join us for an all-night prayer vigil seeking God's direction for the new year.",
    EventDate = new DateTime(2024, 12, 31, 22, 0, 0),
    EndDate = new DateTime(2025, 1, 1, 6, 0, 0),
            Location = "All Branches",
Type = EventType.Prayer,
              Status = EventStatus.Completed,
           CreatedAt = DateTime.UtcNow.AddMonths(-1)
 },
            new Event
 {
     Id = 13,
            Title = "Back to School Prayer & Blessing",
   Description = "Special service to pray for students, teachers, and families as the school year begins.",
       EventDate = new DateTime(2025, 1, 20, 10, 0, 0),
    EndDate = new DateTime(2025, 1, 20, 11, 30, 0),
  Location = "Cape Town Gardens",
         Type = EventType.Prayer,
     Status = EventStatus.Completed,
 BranchId = 4,
         CreatedAt = DateTime.UtcNow.AddDays(-15)
 },
    new Event
     {
       Id = 14,
       Title = "Worship Night - Songs of Praise",
     Description = "An evening dedicated to worship and praise with live music and congregational singing.",
     EventDate = new DateTime(2025, 3, 14, 19, 0, 0),
     EndDate = new DateTime(2025, 3, 14, 21, 30, 0),
      Location = "Pretoria North",
 Type = EventType.Service,
           Status = EventStatus.Upcoming,
         BranchId = 2,
    CreatedAt = DateTime.UtcNow
            },
 new Event
   {
         Id = 15,
   Title = "Food Drive for the Needy",
   Description = "Community food collection drive to help families in need. Bring non-perishable items.",
 EventDate = new DateTime(2025, 2, 22, 9, 0, 0),
        EndDate = new DateTime(2025, 2, 22, 14, 0, 0),
      Location = "Durban Beachfront",
     Type = EventType.Outreach,
   Status = EventStatus.Upcoming,
   BranchId = 3,
      CreatedAt = DateTime.UtcNow
    }
        );
    }
}
