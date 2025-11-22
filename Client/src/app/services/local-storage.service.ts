import { Injectable } from '@angular/core';
import { Branch, Pastor, Event, ChurchInfo, EventStatus, EventType, Highlight, HighlightType, Testimony } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private readonly BRANCHES_KEY = 'voc_branches';
  private readonly PASTORS_KEY = 'voc_pastors';
  private readonly EVENTS_KEY = 'voc_events';
  private readonly CHURCH_INFO_KEY = 'voc_church_info';
  private readonly HIGHLIGHTS_KEY = 'voc_highlights';
  private readonly TESTIMONIES_KEY = 'voc_testimonies';

  constructor() {
    this.initializeDefaultData();
  }

  private initializeDefaultData(): void {
    // Initialize branches if not exists
    if (!localStorage.getItem(this.BRANCHES_KEY)) {
      const defaultBranches: Branch[] = [
        {
          id: 1,
          name: 'Main Branch - Johannesburg',
          address: '123 Church Street',
          city: 'Johannesburg',
          province: 'Gauteng',
          phoneNumber: '+27 11 123 4567',
          email: 'jhb@voiceofchrist.org.za',
          establishedDate: new Date('2010-03-15'),
          isActive: true
        },
        {
          id: 2,
          name: 'Cape Town Branch',
          address: '456 Hope Avenue',
          city: 'Cape Town',
          province: 'Western Cape',
          phoneNumber: '+27 21 987 6543',
          email: 'cpt@voiceofchrist.org.za',
          establishedDate: new Date('2015-07-20'),
          isActive: true
        },
        {
          id: 3,
          name: 'Durban Branch',
          address: '789 Faith Road',
          city: 'Durban',
          province: 'KwaZulu-Natal',
          phoneNumber: '+27 31 456 7890',
          email: 'dbn@voiceofchrist.org.za',
          establishedDate: new Date('2018-11-10'),
          isActive: true
        }
      ];
      this.saveBranches(defaultBranches);
    }

    // Initialize pastors if not exists
    if (!localStorage.getItem(this.PASTORS_KEY)) {
      const defaultPastors: Pastor[] = [
        {
          id: 1,
          firstName: 'John',
          lastName: 'Dube',
          title: 'Senior Pastor',
          bio: 'Pastor John has been serving the community for over 15 years, bringing the word of God with passion and dedication.',
          email: 'pastor.john@voiceofchrist.org.za',
          phoneNumber: '+27 11 123 4567',
          ordainedDate: new Date('2008-05-10'),
          isActive: true,
          branchId: 1
        },
        {
          id: 2,
          firstName: 'Sarah',
          lastName: 'Khumalo',
          title: 'Associate Pastor',
          bio: 'Pastor Sarah leads our youth ministry and has a heart for reaching the younger generation.',
          email: 'pastor.sarah@voiceofchrist.org.za',
          phoneNumber: '+27 11 123 4568',
          ordainedDate: new Date('2015-08-20'),
          isActive: true,
          branchId: 1
        },
        {
          id: 3,
          firstName: 'David',
          lastName: 'van der Merwe',
          title: 'Senior Pastor',
          bio: 'Pastor David established our Cape Town branch and continues to lead with wisdom and grace.',
          email: 'pastor.david@voiceofchrist.org.za',
          phoneNumber: '+27 21 987 6543',
          ordainedDate: new Date('2012-03-15'),
          isActive: true,
          branchId: 2
        },
        {
          id: 4,
          firstName: 'Grace',
          lastName: 'Naidoo',
          title: 'Senior Pastor',
          bio: 'Pastor Grace brings a powerful ministry to Durban, focusing on community outreach and evangelism.',
          email: 'pastor.grace@voiceofchrist.org.za',
          phoneNumber: '+27 31 456 7890',
          ordainedDate: new Date('2016-09-05'),
          isActive: true,
          branchId: 3
        }
      ];
      this.savePastors(defaultPastors);
    }

    // Initialize events if not exists
    if (!localStorage.getItem(this.EVENTS_KEY)) {
      const defaultEvents: Event[] = [
        {
          id: 1,
          title: 'Sunday Worship Service',
          description: 'Join us for our weekly worship service with praise, worship, and powerful preaching.',
          eventDate: new Date('2025-11-23T09:00:00'),
          location: 'Main Church Auditorium',
          type: EventType.Service,
          status: EventStatus.Upcoming,
          createdAt: new Date(),
          branchId: 1
        },
        {
          id: 2,
          title: 'Youth Conference 2025',
          description: 'Three days of worship, workshops, and fellowship for young people aged 13-25.',
          eventDate: new Date('2025-12-05T18:00:00'),
          endDate: new Date('2025-12-07T16:00:00'),
          location: 'Johannesburg Convention Center',
          type: EventType.Youth,
          status: EventStatus.Upcoming,
          createdAt: new Date(),
          branchId: 1
        },
        {
          id: 3,
          title: 'Christmas Carol Service',
          description: 'Celebrate the birth of our Savior with carols, drama, and a special Christmas message.',
          eventDate: new Date('2025-12-24T19:00:00'),
          location: 'All Branches',
          type: EventType.Service,
          status: EventStatus.Upcoming,
          createdAt: new Date()
        },
        {
          id: 4,
          title: "Women's Prayer Breakfast",
          description: 'A morning of prayer, fellowship, and encouragement for all women.',
          eventDate: new Date('2025-11-30T08:00:00'),
          location: 'Main Church Hall',
          type: EventType.Women,
          status: EventStatus.Upcoming,
          createdAt: new Date(),
          branchId: 1
        },
        {
          id: 5,
          title: 'Easter Celebration 2025',
          description: 'Celebrating the resurrection of Jesus Christ with special services and activities.',
          eventDate: new Date('2025-04-20T09:00:00'),
          location: 'All Branches',
          type: EventType.Service,
          status: EventStatus.Completed,
          createdAt: new Date('2025-03-01')
        },
        {
          id: 6,
          title: 'Community Outreach Day',
          description: 'Serving our community with food parcels, health screenings, and prayer.',
          eventDate: new Date('2025-06-15T10:00:00'),
          location: 'Alexandra Township',
          type: EventType.Outreach,
          status: EventStatus.Completed,
          createdAt: new Date('2025-05-01')
        }
      ];
      this.saveEvents(defaultEvents);
    }

    // Initialize church info if not exists
    if (!localStorage.getItem(this.CHURCH_INFO_KEY)) {
      const defaultChurchInfo: ChurchInfo = {
        id: 1,
        mission: 'To proclaim the Gospel of Jesus Christ, make disciples of all nations, and transform communities through the power of God\'s love and Word.',
        vision: 'To be a vibrant, Spirit-filled church that impacts South Africa and beyond, raising up a generation of believers who know God, love God, and serve God with all their hearts.',
        beliefs: `We believe in:
• The Holy Trinity - Father, Son, and Holy Spirit
• The Bible as the inspired and infallible Word of God
• Salvation through faith in Jesus Christ alone
• The power of the Holy Spirit in the life of believers
• The importance of prayer, worship, and fellowship
• The Great Commission to make disciples of all nations
• The second coming of Jesus Christ`,
        history: 'Voice of Christ Church was founded in 2010 in Johannesburg by a group of passionate believers who felt called to establish a church that would reach the lost, equip the saints, and impact communities across South Africa. What started as a small gathering of 20 people has grown into a multi-branch church touching thousands of lives.',
        contactEmail: 'info@voiceofchrist.org.za',
        contactPhone: '+27 11 123 4567',
        foundedDate: new Date('2010-03-15'),
        heroVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        updatedAt: new Date()
      };
      this.saveChurchInfo(defaultChurchInfo);
    }

    // Initialize highlights if not exists
    if (!localStorage.getItem(this.HIGHLIGHTS_KEY)) {
      const defaultHighlights: Highlight[] = [
        {
          id: 1,
          title: 'Sunday Worship Service',
          description: 'Join us every Sunday for an inspiring worship experience',
          type: HighlightType.Image,
          mediaUrl: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800',
          orderIndex: 1,
          isActive: true,
          createdAt: new Date()
        },
        {
          id: 2,
          title: 'Youth Conference 2025',
          description: 'An amazing time of worship and fellowship with our youth',
          type: HighlightType.Video,
          mediaUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          thumbnailUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800',
          orderIndex: 2,
          isActive: true,
          createdAt: new Date()
        },
        {
          id: 3,
          title: 'Community Outreach',
          description: 'Serving our community with love',
          type: HighlightType.Image,
          mediaUrl: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800',
          orderIndex: 3,
          isActive: true,
          createdAt: new Date()
        }
      ];
      this.saveHighlights(defaultHighlights);
    }

    // Initialize testimonies if not exists
    if (!localStorage.getItem(this.TESTIMONIES_KEY)) {
      const defaultTestimonies: Testimony[] = [
        {
          id: 1,
          name: 'Sarah Johnson',
          testimony: 'I came to Voice of Christ Church at a very difficult time in my life. The community embraced me with open arms, and through the powerful teachings and prayers, I found healing and a renewed relationship with God. This church has truly transformed my life!',
          isApproved: true,
          createdAt: new Date('2024-10-15')
        },
        {
          id: 2,
          name: 'David Nkosi',
          testimony: 'Being part of this church family has been an incredible blessing. The youth ministry helped me grow in my faith, and I met amazing friends who encourage me daily. Pastor John\'s messages are always relevant and inspiring. Glory to God!',
          isApproved: true,
          createdAt: new Date('2024-11-01')
        },
        {
          id: 3,
          testimony: 'God has done amazing things in my life through this ministry. I was struggling with addiction, but the prayer warriors here never gave up on me. Today, I am free and serving God with all my heart. Thank you, Voice of Christ Church!',
          isApproved: true,
          createdAt: new Date('2024-11-10')
        },
        {
          id: 4,
          name: 'Grace Mthembu',
          testimony: 'The worship services here are so powerful! Every Sunday I leave feeling refreshed and ready to face the week. The teaching is solid, the people are genuine, and most importantly, the presence of God is evident. I\'m grateful to call this my church home.',
          isApproved: true,
          createdAt: new Date('2024-11-15')
        }
      ];
      this.saveTestimonies(defaultTestimonies);
    }
  }

  // Branches
  getBranches(): Branch[] {
    const data = localStorage.getItem(this.BRANCHES_KEY);
    return data ? JSON.parse(data, this.dateReviver) : [];
  }

  saveBranches(branches: Branch[]): void {
    localStorage.setItem(this.BRANCHES_KEY, JSON.stringify(branches));
  }

  addBranch(branch: Branch): Branch {
    const branches = this.getBranches();
    const newId = Math.max(0, ...branches.map(b => b.id)) + 1;
    const newBranch = { ...branch, id: newId };
    branches.push(newBranch);
    this.saveBranches(branches);
    return newBranch;
  }

  updateBranch(id: number, branch: Branch): void {
    const branches = this.getBranches();
    const index = branches.findIndex(b => b.id === id);
    if (index !== -1) {
      branches[index] = { ...branch, id };
      this.saveBranches(branches);
    }
  }

  deleteBranch(id: number): void {
    const branches = this.getBranches().filter(b => b.id !== id);
    this.saveBranches(branches);
  }

  // Pastors
  getPastors(): Pastor[] {
    const data = localStorage.getItem(this.PASTORS_KEY);
    return data ? JSON.parse(data, this.dateReviver) : [];
  }

  savePastors(pastors: Pastor[]): void {
    localStorage.setItem(this.PASTORS_KEY, JSON.stringify(pastors));
  }

  addPastor(pastor: Pastor): Pastor {
    const pastors = this.getPastors();
    const newId = Math.max(0, ...pastors.map(p => p.id)) + 1;
    const newPastor = { ...pastor, id: newId };
    pastors.push(newPastor);
    this.savePastors(pastors);
    return newPastor;
  }

  updatePastor(id: number, pastor: Pastor): void {
    const pastors = this.getPastors();
    const index = pastors.findIndex(p => p.id === id);
    if (index !== -1) {
      pastors[index] = { ...pastor, id };
      this.savePastors(pastors);
    }
  }

  deletePastor(id: number): void {
    const pastors = this.getPastors().filter(p => p.id !== id);
    this.savePastors(pastors);
  }

  // Events
  getEvents(): Event[] {
    const data = localStorage.getItem(this.EVENTS_KEY);
    return data ? JSON.parse(data, this.dateReviver) : [];
  }

  saveEvents(events: Event[]): void {
    localStorage.setItem(this.EVENTS_KEY, JSON.stringify(events));
  }

  addEvent(event: Event): Event {
    const events = this.getEvents();
    const newId = Math.max(0, ...events.map(e => e.id)) + 1;
    const newEvent = { ...event, id: newId, createdAt: new Date() };
    events.push(newEvent);
    this.saveEvents(events);
    return newEvent;
  }

  updateEvent(id: number, event: Event): void {
    const events = this.getEvents();
    const index = events.findIndex(e => e.id === id);
    if (index !== -1) {
      events[index] = { ...event, id, updatedAt: new Date() };
      this.saveEvents(events);
    }
  }

  deleteEvent(id: number): void {
    const events = this.getEvents().filter(e => e.id !== id);
    this.saveEvents(events);
  }

  // Church Info
  getChurchInfo(): ChurchInfo | null {
    const data = localStorage.getItem(this.CHURCH_INFO_KEY);
    return data ? JSON.parse(data, this.dateReviver) : null;
  }

  saveChurchInfo(info: ChurchInfo): void {
    localStorage.setItem(this.CHURCH_INFO_KEY, JSON.stringify(info));
  }

  updateChurchInfo(info: ChurchInfo): void {
    const updatedInfo = { ...info, updatedAt: new Date() };
    this.saveChurchInfo(updatedInfo);
  }

  // Highlights
  getHighlights(): Highlight[] {
    const data = localStorage.getItem(this.HIGHLIGHTS_KEY);
    return data ? JSON.parse(data, this.dateReviver) : [];
  }

  saveHighlights(highlights: Highlight[]): void {
    localStorage.setItem(this.HIGHLIGHTS_KEY, JSON.stringify(highlights));
  }

  addHighlight(highlight: Highlight): void {
    const highlights = this.getHighlights();
    const newId = highlights.length > 0 ? Math.max(...highlights.map(h => h.id)) + 1 : 1;
    const newHighlight: Highlight = {
      ...highlight,
      id: newId,
      createdAt: new Date()
    };
    highlights.push(newHighlight);
    this.saveHighlights(highlights);
  }

  updateHighlight(highlight: Highlight): void {
    const highlights = this.getHighlights();
    const index = highlights.findIndex(h => h.id === highlight.id);
    if (index !== -1) {
      highlights[index] = { ...highlight, updatedAt: new Date() };
      this.saveHighlights(highlights);
    }
  }

  deleteHighlight(id: number): void {
    const highlights = this.getHighlights().filter(h => h.id !== id);
    this.saveHighlights(highlights);
  }

  // Testimonies Management
  getTestimonies(): Testimony[] {
    const data = localStorage.getItem(this.TESTIMONIES_KEY);
    return data ? JSON.parse(data, this.dateReviver.bind(this)) : [];
  }

  saveTestimonies(testimonies: Testimony[]): void {
    localStorage.setItem(this.TESTIMONIES_KEY, JSON.stringify(testimonies));
  }

  addTestimony(testimony: Testimony): void {
    const testimonies = this.getTestimonies();
    testimonies.push(testimony);
    this.saveTestimonies(testimonies);
  }

  updateTestimony(id: number, updates: Partial<Testimony>): Testimony | null {
    const testimonies = this.getTestimonies();
    const index = testimonies.findIndex(t => t.id === id);
    if (index !== -1) {
      testimonies[index] = { ...testimonies[index], ...updates, updatedAt: new Date() };
      this.saveTestimonies(testimonies);
      return testimonies[index];
    }
    return null;
  }

  deleteTestimony(id: number): boolean {
    const testimonies = this.getTestimonies();
    const filtered = testimonies.filter(t => t.id !== id);
    if (filtered.length !== testimonies.length) {
      this.saveTestimonies(filtered);
      return true;
    }
    return false;
  }

  // Helper for parsing dates from JSON
  private dateReviver(key: string, value: any): any {
    const dateFields = ['establishedDate', 'ordainedDate', 'eventDate', 'endDate', 'createdAt', 'updatedAt', 'foundedDate'];
    if (dateFields.includes(key) && typeof value === 'string') {
      return new Date(value);
    }
    return value;
  }
}
