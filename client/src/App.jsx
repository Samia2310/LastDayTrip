import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BedDouble,
  Binoculars,
  BusFront,
  CalendarDays,
  CalendarRange,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  CircleHelp,
  Clock3,
  CloudSun,
  Download,
  Heart,
  ImageIcon,
  Languages,
  MapPinned,
  Menu,
  MessageCircle,
  Plane,
  PlusCircle,
  ReceiptText,
  Search,
  Share2,
  ShieldCheck,
  ShieldX,
  SlidersHorizontal,
  Smartphone,
  Stamp,
  Star,
  ThumbsUp,
  Tickets,
  UserRound,
  Users,
  UtensilsCrossed
} from "lucide-react";
import { fetchTour, createBooking } from "./lib/api.js";
import { ImageAsset } from "./components/ImageAsset.jsx";
import { Accordion } from "./components/Accordion.jsx";

const TOUR_SLUG = "barishal-backwater-sundarbans";

const iconMap = {
  badgeCheck: BadgeCheck,
  bedDouble: BedDouble,
  binoculars: Binoculars,
  busFront: BusFront,
  calendarRange: CalendarRange,
  cloudSun: CloudSun,
  clock3: Clock3,
  languages: Languages,
  mapPinned: MapPinned,
  plane: Plane,
  plusCircle: PlusCircle,
  receiptText: ReceiptText,
  shieldCheck: ShieldCheck,
  shieldX: ShieldX,
  smartphone: Smartphone,
  stamp: Stamp,
  tickets: Tickets,
  userRound: UserRound,
  users: Users,
  utensilsCrossed: UtensilsCrossed
};

const sectionLinks = [
  { id: "highlights", label: "Highlights" },
  { id: "itinerary", label: "Itinerary" },
  { id: "inclusions", label: "Inclusion & Exclusion" },
  { id: "gallery", label: "Gallery" },
  { id: "reviews", label: "Reviews" },
  { id: "faq", label: "FAQ" }
];

const footerColumns = [
  {
    title: "Support",
    links: [
      "Contact",
      "Legal Notices",
      "Privacy Policy",
      "Cookies and Marketing Preferences",
      "Internal Issue and Co-Workers",
      "Intervention something in the United States and the E.U.",
      "Do not Sell or Share My Personal Information"
    ]
  },
  {
    title: "Company",
    links: ["About Us", "Careers", "News", "Press", "Gift Cards", "Explorer"]
  },
  {
    title: "Work With Us",
    links: [
      "As a Supply Partner",
      "As a Content Creator",
      "As an Affiliate Partner",
      "Write for Us / Copy"
    ]
  }
];

function IconBadge({ name, size = 18 }) {
  const Icon = iconMap[name] || ImageIcon;
  return <Icon size={size} strokeWidth={1.8} />;
}

function RatingStars({ value }) {
  const fullStars = Math.round(value);

  return (
    <div className="rating-stars" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          size={13}
          className={index < fullStars ? "star star--filled" : "star"}
          fill={index < fullStars ? "currentColor" : "none"}
        />
      ))}
    </div>
  );
}

function DetailCard({ item }) {
  return (
    <article className="detail-card">
      <div className="detail-card__icon">
        <IconBadge name={item.icon} />
      </div>
      <div>
        <h3>{item.title}</h3>
        <p>{item.subtitle}</p>
      </div>
    </article>
  );
}

function SupportActionCard({ onInstantQuery }) {
  return (
    <div className="side-support-card">
      <p className="side-support-card__title">Plan your adventure:</p>
      <button type="button" className="support-link">
        <Download size={16} />
        <span className="support-link__label">Download PDF Brochure</span>
      </button>
      <button type="button" className="support-link" onClick={onInstantQuery}>
        <CircleHelp size={18} />
        <span className="support-link__label">Instant Query</span>
      </button>
    </div>
  );
}

function ReviewCard({ review }) {
  return (
    <article className="review-card">
      <div className="review-card__top">
        <div className="review-user">
          <div className="review-avatar">{review.initial}</div>
          <div>
            <h4>{review.name}</h4>
            <p>{review.date}</p>
          </div>
        </div>
        <div className="review-score-line">
          <span>{review.rating.toFixed(1)}</span>
          <RatingStars value={review.rating} />
        </div>
      </div>

      <p className="review-title">{review.title}</p>
      <p className="review-text">{review.text}</p>
      <button type="button" className="review-link">
        Show more
      </button>
      <p className="review-travel-date">Traveled in {review.travelDate}</p>

      <div className="review-reply">
        <strong>{review.reply.author}</strong>
        <p>{review.reply.message}</p>
      </div>

      <div className="review-actions">
        <button type="button" aria-label="Like review">
          <ThumbsUp size={15} />
        </button>
        <button type="button" aria-label="Reply to review">
          <MessageCircle size={15} />
        </button>
      </div>
    </article>
  );
}

function DateCard({ item }) {
  return (
    <article className="date-card">
      <div className="date-card__badge-row">
        <div>{item.badge ? <span className="pill pill--outline">{item.badge}</span> : null}</div>
        <span className="discount-badge">{item.discount}</span>
      </div>

      <div className="date-card__content">
        <div className="date-range">
          <div>
            <small>{item.fromLabel}</small>
            <strong>{item.from}</strong>
          </div>
          <ArrowRight size={18} />
          <div>
            <small>{item.toLabel}</small>
            <strong>{item.to}</strong>
          </div>
        </div>

        <div className="date-price">
          <small>From:</small>
          <div>
            <s>{item.oldPrice}</s>
            <strong>US {item.price}</strong>
            <span>per person</span>
          </div>
        </div>
      </div>

      <div className="date-card__footer">
        <div className="date-tags">
          <span>
            <Languages size={14} />
            {item.language}
          </span>
          <span>
            <BedDouble size={14} />
            {item.roomType}
          </span>
          <span>
            {item.note.toLowerCase().includes("hold") ? <Clock3 size={14} /> : <BadgeCheck size={14} />}
            {item.note}
          </span>
        </div>
        <button type="button">Confirm Dates</button>
      </div>
    </article>
  );
}

function ItineraryDayRow({ day, isActive, onClick }) {
  return (
    <button
      type="button"
      className={`day-pill ${isActive ? "is-active" : ""}`}
      onClick={onClick}
      aria-expanded={isActive}
    >
      <div className="day-pill__main">
        <span>{day.day}</span>
        <strong>{day.title}</strong>
      </div>
      <ChevronDown size={20} className="day-pill__chevron" />
    </button>
  );
}

function App() {
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeDay, setActiveDay] = useState(0);
  const [activeSection, setActiveSection] = useState("highlights");
  const [includedOpenIndexes, setIncludedOpenIndexes] = useState([0]);
  const [excludedOpenIndexes, setExcludedOpenIndexes] = useState([]);
  const [faqOpenIndex, setFaqOpenIndex] = useState(0);
  const [goodToKnowOpenIndex, setGoodToKnowOpenIndex] = useState(0);
  const [faqFilter, setFaqFilter] = useState("All questions");
  const [reviewSearch, setReviewSearch] = useState("");
  const [showAllDates, setShowAllDates] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingStatus, setBookingStatus] = useState("");
  const [bookingForm, setBookingForm] = useState({
    packageType: "Standard Package",
    tourType: "Group Tour",
    travelMonth: "May 2027",
    travelers: "2 Adults",
    guestName: "",
    email: "",
    notes: ""
  });
  const galleryRef = useRef(null);

  useEffect(() => {
    const loadTour = async () => {
      try {
        const response = await fetchTour(TOUR_SLUG);
        setTour(response);
        setBookingForm((current) => ({
          ...current,
          packageType: response.content.bookingPanel.packageTypes[0],
          tourType: response.content.bookingPanel.tourTypes[0],
          travelMonth: response.content.bookingPanel.months[0],
          travelers: response.content.bookingPanel.travelers[0]
        }));
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setLoading(false);
      }
    };

    loadTour();
  }, []);

  const filteredFaqs = useMemo(() => {
    if (!tour) {
      return [];
    }

    if (faqFilter === "All questions") {
      return tour.faqs;
    }

    return tour.faqs.filter((faq) => faq.category === faqFilter);
  }, [faqFilter, tour]);

  const filteredReviews = useMemo(() => {
    if (!tour) {
      return [];
    }

    if (!reviewSearch.trim()) {
      return tour.reviews;
    }

    const query = reviewSearch.toLowerCase();

    return tour.reviews.filter((review) => {
      return (
        review.name.toLowerCase().includes(query) ||
        review.text.toLowerCase().includes(query) ||
        review.title.toLowerCase().includes(query)
      );
    });
  }, [reviewSearch, tour]);

  const visibleDates = useMemo(() => {
    if (!tour) {
      return [];
    }

    return showAllDates ? tour.availability : tour.availability.slice(0, 6);
  }, [showAllDates, tour]);

  const toggleIndex = (currentIndexes, index) => {
    return currentIndexes.includes(index)
      ? currentIndexes.filter((item) => item !== index)
      : [...currentIndexes, index];
  };

  const scrollToSection = (id) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollGallery = (direction) => {
    galleryRef.current?.scrollBy({ left: direction * 280, behavior: "smooth" });
  };

  const handleBookingSubmit = async (event) => {
    event.preventDefault();
    setBookingStatus("Submitting booking...");

    try {
      await createBooking({
        tourSlug: tour.slug,
        ...bookingForm
      });
      setBookingStatus("Booking request submitted successfully.");
      setBookingForm((current) => ({
        ...current,
        guestName: "",
        email: "",
        notes: ""
      }));
    } catch (submitError) {
      setBookingStatus(submitError.message);
    }
  };

  if (loading) {
    return <div className="screen-message">Loading tour page...</div>;
  }

  if (error || !tour) {
    return (
      <div className="screen-message screen-message--error">
        <h2>Unable to load the tour page.</h2>
        <p>{error || "Please make sure the API server and MongoDB are running."}</p>
      </div>
    );
  }

  const { content } = tour;
  const activeItineraryDay = content.itinerary.days[activeDay];
  const itineraryPreviewImage = content.itinerary.days[0];
  const includedItems = content.inclusions.included.map((item) => ({
    title: item.title,
    description: item.description,
    content: item.description,
    leading: <IconBadge name={item.icon} size={16} />
  }));
  const excludedItems = content.inclusions.excluded.map((item) => ({
    title: item.title,
    description: item.description,
    content: item.description,
    leading: <IconBadge name={item.icon} size={16} />
  }));

  return (
    <div className="app-shell">
      <header className="hero-shell">
        <div className="hero-topline">
          <div className="hero-topline__right">
            <a href="#!">FAQs</a>
            <a href="#!">BROCHURE</a>
            <a href="#!">CONTACT US</a>
            <button type="button" className="quote-button">
              GET A QUOTE
            </button>
          </div>
        </div>

        <div className="main-nav">
          <a href="/" className="brand">
            <span className="brand-mark" />
            <span>lastdaytrip</span>
          </a>

          <nav className="nav-links" aria-label="Primary">
            <a href="#!">Destination</a>
            <a href="#!">Ways Of Travel</a>
            <a href="#!">Tours</a>
            <a href="#!">Know</a>
            <a href="#!">Stories</a>
            <a href="#!">About</a>
          </nav>

          <div className="nav-actions">
            <button type="button" className="icon-button" aria-label="Search">
              <Search size={16} />
            </button>
            <button type="button" className="signup-button">
              Sign Up
            </button>
            <button type="button" className="mobile-menu-button" aria-label="Open menu">
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      <main className="page-shell">
        <div className="page-grid">
          <section className="content-column content-column--summary">
            <div className="breadcrumbs">
              {content.header.breadcrumbs.map((item, index) => (
                <span key={item}>
                  {item}
                  {index < content.header.breadcrumbs.length - 1 ? " / " : ""}
                </span>
              ))}
            </div>

            <div className="headline-block">
              <div>
                <h1 className="page-title">{tour.title}</h1>
                <div className="tour-meta">
                  <span className="pill pill--soft">{content.header.badge}</span>
                  <span className="tour-rating">
                    <strong>{tour.rating.toFixed(1)}</strong>
                    <RatingStars value={tour.rating} />
                  </span>
                  <span>{tour.travelerCountLabel}</span>
                  <span>{tour.location}</span>
                  <span>3 Locations</span>
                  <span>{tour.experienceCountLabel}</span>
                </div>
              </div>
            </div>

            <section className="hero-gallery">
              {content.header.gallery.map((item) => (
                <ImageAsset
                  key={item.label}
                  src={item.src}
                  label={item.label}
                  alt={item.label}
                  className={`gallery-card gallery-card--${item.size}`}
                  overlay
                />
              ))}
            </section>

            <section className="detail-card-grid">
              {content.header.detailCards.map((item) => (
                <DetailCard key={item.title} item={item} />
              ))}
            </section>

            <section className="copy-block">
              {content.description.map((paragraph, index) => (
                <p key={paragraph}>
                  {paragraph}
                  {index === content.description.length - 1 ? (
                    <button type="button" className="inline-link-button">
                      SEE MORE
                    </button>
                  ) : null}
                </p>
              ))}
            </section>

            <div className="full-width-content">
              <div className="section-tab-row">
                {sectionLinks.map((link) => (
                  <button
                    type="button"
                    key={link.id}
                    className={`section-tab ${activeSection === link.id ? "is-active" : ""}`}
                    onClick={() => scrollToSection(link.id)}
                  >
                    {link.label}
                  </button>
                ))}
              </div>

              <section id="highlights" className="content-section">
                <div className="section-heading">
                  <h2>Tour Highlights</h2>
                </div>
                <ul className="bullet-list">
                  {content.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </section>

              <section id="itinerary" className="content-section">
                <div className="section-heading">
                  <h2>Itinerary</h2>
                </div>

                <div className="itinerary-frame">
                  <div className="route-strip">
                    <div className="route-point">
                      <MapPinned size={18} />
                      <div>
                        <strong>Start Point</strong>
                        <span>{content.itinerary.startPoint}</span>
                      </div>
                    </div>
                    <div className="route-point">
                      <MapPinned size={18} />
                      <div>
                        <strong>End Point</strong>
                        <span>{content.itinerary.endPoint}</span>
                      </div>
                    </div>
                  </div>

                  <ImageAsset
                    src={content.itinerary.mapImage}
                    label={content.itinerary.mapLabel}
                    alt="Itinerary map"
                    className="map-image"
                    overlay
                  />

                  <div className="itinerary-map-card">
                    <div className="itinerary-card-header">
                      <h3>Itinerary &amp; Map</h3>
                      <button type="button">View Full Itinerary</button>
                    </div>

                    <div className="day-pill-list">
                      {content.itinerary.days.map((day, index) => (
                        <ItineraryDayRow
                          key={day.day}
                          day={day}
                          isActive={activeDay === index}
                          onClick={() => setActiveDay(index)}
                        />
                      ))}
                    </div>

                    <div className="itinerary-day-detail">
                      <div className="itinerary-steps">
                        {activeItineraryDay.steps.map((step, index) => (
                          <div className="itinerary-step" key={`${activeItineraryDay.day}-${index}`}>
                            <div className="step-marker">{index + 1}</div>
                            <p>{step}</p>
                          </div>
                        ))}
                      </div>

                      <ImageAsset
                        src={itineraryPreviewImage.image}
                        label={itineraryPreviewImage.imageLabel}
                        alt="Itinerary preview"
                        className="itinerary-image"
                        overlay
                      />
                    </div>
                  </div>
                </div>
              </section>

              <section id="inclusions" className="content-section">
                <div className="section-heading section-heading--split">
                  <h2>What&apos;s Included</h2>
                  <button
                    type="button"
                    className="link-style-button"
                    onClick={() =>
                      setIncludedOpenIndexes((current) =>
                        current.length === includedItems.length
                          ? []
                          : includedItems.map((_, index) => index)
                      )
                    }
                  >
                    {includedOpenIndexes.length === includedItems.length ? "Collapse All" : "Expand All"}
                  </button>
                </div>

                <Accordion
                  items={includedItems}
                  openIndexes={includedOpenIndexes}
                  onToggle={(index) =>
                    setIncludedOpenIndexes((current) => toggleIndex(current, index))
                  }
                  compact
                />

                <div className="subsection-heading">What&apos;s Not Included</div>

                <Accordion
                  items={excludedItems}
                  openIndexes={excludedOpenIndexes}
                  onToggle={(index) =>
                    setExcludedOpenIndexes((current) => toggleIndex(current, index))
                  }
                  compact
                />
              </section>

              <section className="content-section">
              <div className="section-heading">
                <h2>Additional Info</h2>
              </div>

              <div className="note-stack">
                {content.notes.map((note) => (
                  <article className="note-card" key={note.title}>
                    <h3>{note.title}</h3>
                    <ul className="bullet-list bullet-list--small">
                      {note.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>

              <div className="peace-panel">
                <div className="peace-panel__copy">
                  <h3>Your Peace of Mind Options</h3>
                  <div className="peace-options">
                    {content.peaceOfMind.map((item) => (
                      <div className="peace-option" key={item.title}>
                        <div className="peace-option__icon">
                          <IconBadge name={item.icon} />
                        </div>
                        <div>
                          <strong>{item.title}</strong>
                          <span>{item.description}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <button type="button" className="ghost-button">
                  Explore your options
                </button>
              </div>
              </section>

              <section id="gallery" className="content-section">
              <div className="section-heading section-heading--split">
                <h2>Traveler Moments</h2>
                <div className="scroller-controls">
                  <button type="button" onClick={() => scrollGallery(-1)} aria-label="Previous images">
                    <ChevronLeft size={18} />
                  </button>
                  <button type="button" onClick={() => scrollGallery(1)} aria-label="Next images">
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>

              <div className="horizontal-scroller" ref={galleryRef}>
                {content.travelerMoments.map((item) => (
                  <ImageAsset
                    key={item.label}
                    src={item.src}
                    label={item.label}
                    alt={item.label}
                    className="moment-card"
                    overlay
                  />
                ))}
              </div>
              </section>

              <section id="reviews" className="content-section">
              <div className="section-heading">
                <h2>Traveler Reviews</h2>
              </div>

              <div className="review-summary">
                <div className="review-summary__score">
                  <div className="review-rating">{tour.rating.toFixed(1)}</div>
                  <RatingStars value={tour.rating} />
                  <p>Overall rating based on {tour.reviewCount} Reviews</p>
                </div>

                <div className="review-breakdown">
                  {content.reviewSummary.categories.map((item) => (
                    <div className="review-bar-row" key={item.label}>
                      <span>{item.label}</span>
                      <div className="review-bar">
                        <div style={{ width: `${(item.value / 5) * 100}%` }} />
                      </div>
                      <strong>{item.value.toFixed(1)}</strong>
                    </div>
                  ))}
                </div>
              </div>

              <div className="review-toolbar">
                <div className="search-field">
                  <input
                    type="text"
                    value={reviewSearch}
                    onChange={(event) => setReviewSearch(event.target.value)}
                    placeholder="Search"
                  />
                  <button type="button" className="search-field__button" aria-label="Search reviews">
                    <Search size={16} />
                  </button>
                </div>

                <button type="button" className="sort-button">
                  Sort: Most recent
                </button>
              </div>

              <div className="review-list">
                {filteredReviews.map((review) => (
                  <ReviewCard key={`${review.name}-${review.date}`} review={review} />
                ))}
              </div>

              <div className="review-more-wrap">
                <button type="button" className="show-more-button show-more-button--small">
                  Show More Reviews
                </button>
              </div>

              <div className="review-cta">
                <select
                  value={bookingForm.travelMonth}
                  onChange={(event) =>
                    setBookingForm((current) => ({ ...current, travelMonth: event.target.value }))
                  }
                >
                  {content.bookingPanel.months.map((month) => (
                    <option key={month}>{month}</option>
                  ))}
                </select>

                <select
                  value={bookingForm.travelers}
                  onChange={(event) =>
                    setBookingForm((current) => ({ ...current, travelers: event.target.value }))
                  }
                >
                  {content.bookingPanel.travelers.map((traveler) => (
                    <option key={traveler}>{traveler}</option>
                  ))}
                </select>

                <button type="button" onClick={() => scrollToSection("dates")}>
                  Check Availability
                </button>
              </div>
              </section>

              <section id="dates" className="content-section">
              <div className="section-heading">
                <h2>Dates &amp; Availability</h2>
              </div>

              <div className="warning-strip">
                <div>
                  <CircleAlert size={16} />
                  <span>Hurry, deals only available for a limited time!</span>
                </div>
                <strong>Ends in 0d 17h 20m 9s</strong>
              </div>

              <div className="date-card-list">
                {visibleDates.map((item, index) => (
                  <DateCard key={`${item.from}-${index}`} item={item} />
                ))}
              </div>

              <button
                type="button"
                className="show-more-button"
                onClick={() => setShowAllDates((current) => !current)}
              >
                {showAllDates ? "Show Fewer Upcoming Dates" : "Show More Upcoming Dates"}
              </button>
              </section>

              <section id="faq" className="content-section">
              <div className="section-heading">
                <h2>FAQs</h2>
              </div>
              <p className="section-subcopy">What our customer ask about this tours?</p>

              <div className="chip-row">
                {content.faqCategories.map((item) => (
                  <button
                    type="button"
                    key={item}
                    className={`chip ${faqFilter === item ? "is-active" : ""}`}
                    onClick={() => {
                      setFaqFilter(item);
                      setFaqOpenIndex(0);
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <Accordion
                items={filteredFaqs.map((item) => ({
                  question: item.question,
                  answer: item.answer
                }))}
                openIndex={faqOpenIndex}
                onToggle={(index) => setFaqOpenIndex(index === faqOpenIndex ? -1 : index)}
                className="faq-accordion"
              />

              <div className="contact-panel" id="contact-operator">
                <div className="contact-panel__copy">
                  <span className="contact-icon">?</span>
                  <div>
                    <h3>Can&apos;t find the answer to your question?</h3>
                    <p>
                      Reach out to the experts at Dimensione Sicilia - Dimsi Incoming
                      Operator Srl with your enquiry, they usually respond within 1 day.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="contact-operator-button"
                >
                  Contact Operator
                </button>
              </div>
              </section>

              <section className="content-section">
              <div className="section-heading">
                <h2>Good to Know</h2>
              </div>
              <p className="section-subcopy">Tour ID: 20418</p>

              <Accordion
                items={content.goodToKnow.map((item) => ({
                  title: item.title,
                  content: item.content
                }))}
                openIndex={goodToKnowOpenIndex}
                onToggle={(index) =>
                  setGoodToKnowOpenIndex(index === goodToKnowOpenIndex ? -1 : index)
                }
                className="faq-accordion"
              />

              <button type="button" className="show-more-button show-more-button--left">
                Show more FAQs
              </button>
              </section>

            </div>
          </section>

          <aside className="sidebar-column">
            <div className="sidebar-stack">
              <div className="booking-panel">
                <div className="panel-actions">
                  <button type="button">
                    <Heart size={16} />
                    Add to wishlist
                  </button>
                  <button type="button">
                    <Share2 size={16} />
                    Share
                  </button>
                </div>

                <div className="panel-block">
                  <label>Select your inclusion type</label>
                  <div className="option-stack">
                    {content.bookingPanel.packageTypes.map((item) => (
                      <button
                        type="button"
                        key={item}
                        className={`choice-button ${bookingForm.packageType === item ? "is-active" : ""}`}
                        onClick={() =>
                          setBookingForm((current) => ({ ...current, packageType: item }))
                        }
                      >
                        <span className="choice-dot" />
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="panel-block">
                  <label>Select your tour type</label>
                  <div className="tour-type-toggle">
                    {content.bookingPanel.tourTypes.map((item) => (
                      <button
                        type="button"
                        key={item}
                        className={bookingForm.tourType === item ? "is-active" : ""}
                        onClick={() =>
                          setBookingForm((current) => ({ ...current, tourType: item }))
                        }
                      >
                        {item.toLowerCase().includes("group") ? (
                          <Users size={17} />
                        ) : (
                          <SlidersHorizontal size={17} />
                        )}
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="price-box">
                  <div className="price-box__top">
                    <span>From {content.bookingPanel.priceBefore}</span>
                    <span className="discount-badge">{content.bookingPanel.savings}</span>
                  </div>
                  <div className="price-box__amount">
                    <span>US</span>
                    <strong>{content.bookingPanel.priceNow}</strong>
                    <span>per person</span>
                  </div>
                  <p>Price based on Private Double Room</p>
                </div>

                <div className="select-stack">
                  <label>
                    <CalendarDays size={16} />
                    <select
                      value={bookingForm.travelMonth}
                      onChange={(event) =>
                        setBookingForm((current) => ({ ...current, travelMonth: event.target.value }))
                      }
                    >
                      {content.bookingPanel.months.map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>
                  </label>

                  <label>
                    <Users size={16} />
                    <select
                      value={bookingForm.travelers}
                      onChange={(event) =>
                        setBookingForm((current) => ({ ...current, travelers: event.target.value }))
                      }
                    >
                      {content.bookingPanel.travelers.map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="primary-actions">
                  <button
                    type="button"
                    className="primary-book-button"
                    onClick={() => setShowBookingForm((current) => !current)}
                  >
                    Book this Tour
                  </button>
                  <button type="button" className="wishlist-circle" aria-label="Add to favorites">
                    <Heart size={17} />
                  </button>
                </div>

                {showBookingForm ? (
                  <form className="sidebar-form" onSubmit={handleBookingSubmit}>
                    <input
                      type="text"
                      placeholder="Guest name"
                      value={bookingForm.guestName}
                      onChange={(event) =>
                        setBookingForm((current) => ({ ...current, guestName: event.target.value }))
                      }
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email address"
                      value={bookingForm.email}
                      onChange={(event) =>
                        setBookingForm((current) => ({ ...current, email: event.target.value }))
                      }
                      required
                    />
                    <textarea
                      placeholder="Booking notes"
                      value={bookingForm.notes}
                      onChange={(event) =>
                        setBookingForm((current) => ({ ...current, notes: event.target.value }))
                      }
                    />
                    <button type="submit" className="secondary-submit">
                      Submit Booking
                    </button>
                    {bookingStatus ? <p className="form-status">{bookingStatus}</p> : null}
                  </form>
                ) : null}

                <p className="price-guarantee">
                  <BadgeCheck size={16} />
                  Best price guarantee <a href="#!">Learn More</a>
                </p>
              </div>

            <SupportActionCard
              onInstantQuery={() => {
                  scrollToSection("contact-operator");
              }}
            />
            </div>
          </aside>

          <section className="content-section similar-tours-section">
            <div className="section-heading">
              <h2>Similar tour like this</h2>
            </div>
            <p className="section-subcopy">Find your dream tour.</p>

            <div className="search-suggestions">
              <strong>PEOPLE ALSO SEARCH FOR</strong>
              <div className="tag-grid">
                {content.searchTags.map((tag) => (
                  <span key={tag}>
                    <Search size={12} />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="related-tour-row">
              {content.relatedTours.map((item, index) => (
                <article className="related-tour-card" key={`${item.title}-${index}`}>
                  <ImageAsset
                    src={item.image}
                    label={item.imageLabel}
                    alt={item.title}
                    className="related-tour-image"
                    overlay
                  />

                  <div className="related-tour-body">
                    <h3>{item.title}</h3>
                    <div className="related-tour-footer">
                      <span>
                        FROM <strong>{item.price}</strong>
                      </span>
                      <button type="button">Book</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>

      <footer className="site-footer">
        <div className="footer-grid">
          <div className="footer-locale">
            <div className="footer-group">
              <h4>Language</h4>
              <div className="footer-select">
                <span>English (United States)</span>
                <span className="footer-select__icon">↗</span>
              </div>
            </div>
            <div className="footer-group">
              <h4>Currency</h4>
              <div className="footer-select">
                <span>U.S. Dollar ($)</span>
                <span className="footer-select__icon">↗</span>
              </div>
            </div>
          </div>

          <div className="footer-mobile">
            <h4>Mobile</h4>
            <div className="footer-store-list">
              <div className="store-badge">
                <span className="store-badge__icon store-badge__icon--play" />
                <span className="store-badge__copy">
                  <small>GET IT ON</small>
                  <strong>Google Play</strong>
                </span>
              </div>
              <div className="store-badge">
                <span className="store-badge__icon store-badge__icon--apple" />
                <span className="store-badge__copy">
                  <small>Download on the</small>
                  <strong>App Store</strong>
                </span>
              </div>
            </div>
          </div>

          {footerColumns.map((column) => (
            <div className="footer-column" key={column.title}>
              <h4>{column.title}</h4>
              <div className="footer-link-list">
                {column.links.map((link) => (
                  <a href="#!" key={link}>
                    {link}
                  </a>
                ))}
              </div>
              {column.title === "Work With Us" ? (
                <div className="payment-row">
                  <span>VISA</span>
                  <span>MC</span>
                  <span>AMEX</span>
                  <span>PayPal</span>
                </div>
              ) : null}
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <p>&copy; 2006 - 2025 LastDayTrip Media in Zurich &amp; Berlin.</p>
          <div className="footer-socials">
            <span>f</span>
            <span>◎</span>
            <span>x</span>
            <span>•</span>
            <span>in</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
