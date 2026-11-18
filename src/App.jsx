import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Link,
  NavLink,
  Route,
  Routes,
  useNavigate,
  useSearchParams,
  useParams,
} from "react-router-dom";
import { properties } from "./data/properties";

const BaseraContext = createContext(null);
const money = (n) => "₹" + Number(n || 0).toLocaleString("en-IN");
const readStore = (key, fallback = []) => {
  try {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
  } catch {
    return fallback;
  }
};
const writeStore = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));

function Header() {
  const { favourites } = useContext(BaseraContext);
  return (
    <header className="navbar">
      <Link className="logo" to="/">
        <span>⌂</span> basera
      </Link>
      <nav>
        <NavLink to="/search">Find a Stay</NavLink>
        <NavLink to="/compare">Compare</NavLink>
        <NavLink to="/safety">Safety</NavLink>
        <NavLink to="/favourites">
          Saved <span className="badge">{favourites.length}</span>
        </NavLink>
        <NavLink to="/owner" className="nav-btn">
          List Property
        </NavLink>
      </nav>
    </header>
  );
}
function Footer() {
  return (
    <footer>
      <div className="logo">
        <span>⌂</span> basera
      </div>
      <p>Find your place. Make it home.</p>
      <p>Semester 1 · React frontend prototype · Demo data</p>
    </footer>
  );
}
function PageTitle({ eyebrow, title, subtitle }) {
  return (
    <section className="page-title">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </section>
  );
}
function PropertyCard({ p }) {
  const { favourites, toggleFavourite, compare, toggleCompare } =
    useContext(BaseraContext);
  const fav = favourites.includes(p.id),
    cmp = compare.includes(p.id);
  return (
    <article className="listing-card">
      <div className="card-img">
        <img src={p.imageUrl} alt={`${p.name} accommodation`} loading="lazy" />
        <button
          className={`heart ${fav ? "liked" : ""}`}
          onClick={() => toggleFavourite(p.id)}
          aria-label="Toggle favourite"
        >
          {fav ? "♥" : "♡"}
        </button>
        {p.verified && <em>✓ Details reviewed (demo)</em>}
      </div>
      <div className="card-body">
        <div className="type-row">
          <span>{p.type}</span>
          <span>📍 {p.distance} km</span>
        </div>
        <h3>{p.name}</h3>
        <p className="muted">{p.location}</p>
        <div className="rating">
          ★ {p.rating} <small>({p.reviews} sample reviews)</small>
        </div>
        <div className="availability">{p.availability}</div>
        <div className="amenities">
          {p.amenities.slice(0, 3).map((a) => (
            <span key={a}>{a}</span>
          ))}
        </div>
        <div className="price-row">
          <div>
            <strong>{money(p.price)}</strong>
            <small>/month</small>
          </div>
          <button
            className={`outline small ${cmp ? "selected" : ""}`}
            onClick={() => toggleCompare(p.id)}
          >
            {cmp ? "✓ Added" : "Compare"}
          </button>
          <Link className="primary small" to={`/property/${p.id}`}>
            View
          </Link>
        </div>
      </div>
    </article>
  );
}
function EmptyState({ icon, title, description, linkText, to }) {
  return (
    <div className="empty">
      <span>{icon}</span>
      <h3>{title}</h3>
      <p>{description}</p>
      <Link className="primary" to={to}>
        {linkText} →
      </Link>
    </div>
  );
}
function Home() {
  const [q, setQ] = useState(""),
    [type, setType] = useState("");
  const navigate = useNavigate();
  const search = (term) =>
    navigate(
      `/search?q=${encodeURIComponent(term ?? q)}${type ? `&type=${encodeURIComponent(type)}` : ""}`,
    );
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">STUDENT ACCOMMODATION, SIMPLIFIED</p>
          <h1>
            Find a place
            <br />
            <span>that feels like home.</span>
          </h1>
          <p className="hero-text">
            Discover PGs, flats, hostels and rooms near your college. Compare
            costs, understand the details and shortlist with confidence.
          </p>
          <div className="search-box">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && search()}
              placeholder="Search by college, area or locality"
            />
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="">All stays</option>
              {["PG", "Flat", "Hostel", "Independent Room"].map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
            <button onClick={() => search()}>Search stays →</button>
          </div>
          <div className="quick-tags">
            {["KIET", "Muradnagar", "Raj Nagar", "Vaishali", "Modinagar"].map(
              (x) => (
                <button key={x} onClick={() => search(x)}>
                  {x === "KIET" ? "Near KIET" : x}
                </button>
              ),
            )}
          </div>
          <div className="hero-highlights">
            <span>25 sample listings</span>
            <span>True monthly cost</span>
            <span>Student-first tools</span>
          </div>
        </div>
        <div className="hero-card">
          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85"
              alt="Modern accommodation interior"
            />
          </div>
          <div className="hero-mini">
            <div>
              <strong>{properties.length}</strong>
              <small>property listings</small>
            </div>
            <div>
              <strong>4</strong>
              <small>stay categories</small>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="section-head">
          <div>
            <p className="eyebrow">EXPLORE</p>
            <h2>Find what fits your life.</h2>
          </div>
          <Link to="/search">View all →</Link>
        </div>
        <div className="category-grid">
          {[
            [
              "PGs",
              "Ready-to-move stays with useful amenities.",
              "PG",
              "photo-1600210492486-724fe5c67fb0",
            ],
            [
              "Flats",
              "Shared and independent flat options.",
              "Flat",
              "photo-1600585154340-be6161a56a0c",
            ],
            [
              "Hostels",
              "Budget-friendly student accommodation.",
              "Hostel",
              "photo-1555854877-bab0e564b8d5",
            ],
            [
              "Independent rooms",
              "A room with more personal space.",
              "Independent Room",
              "photo-1600566753086-00f18fb6b3ea",
            ],
          ].map(([name, desc, value, img]) => (
            <Link
              className="category-card"
              key={name}
              to={`/search?type=${encodeURIComponent(value)}`}
            >
              <img
                src={`https://images.unsplash.com/${img}?auto=format&fit=crop&w=900&q=80`}
                alt=""
              />
              <div className="category-copy">
                <h3>{name}</h3>
                <p>{desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="section soft">
        <div className="section-head">
          <div>
            <p className="eyebrow">POPULAR AROUND STUDENTS</p>
            <h2>Explore sample stays</h2>
          </div>
          <Link to="/search">See all 25 →</Link>
        </div>
        <div className="listing-grid">
          {properties.slice(0, 4).map((p) => (
            <PropertyCard key={p.id} p={p} />
          ))}
        </div>
      </section>
      <section className="section tool-strip">
        <p className="eyebrow">MORE THAN A LISTING DIRECTORY</p>
        <h2>Tools that help you decide.</h2>
        <div className="tool-grid">
          {[
            [
              "₹",
              "TrueCost Calculator",
              "Estimate rent, food, electricity and other monthly expenses.",
              "/search",
            ],
            [
              "✓",
              "Trust & verification",
              "See which listing details are marked as reviewed.",
              "/safety",
            ],
            [
              "⚑",
              "Report a listing",
              "Flag suspicious or misleading property information.",
              "/safety",
            ],
          ].map(([icon, title, desc, to]) => (
            <Link to={to} className="tool-card" key={title}>
              <b>{icon}</b>
              <h3>{title}</h3>
              <p>{desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
function SearchPage() {
  const [params] = useSearchParams();
  const [q, setQ] = useState(params.get("q") || ""),
    [type, setType] = useState(params.get("type") || ""),
    [rent, setRent] = useState(20000),
    [room, setRoom] = useState(""),
    [rating, setRating] = useState("0"),
    [food, setFood] = useState(false),
    [wifi, setWifi] = useState(false),
    [ac, setAc] = useState(false),
    [verified, setVerified] = useState(params.get("verified") === "1"),
    [sort, setSort] = useState("recommended");
  const filtered = useMemo(() => {
    let list = properties.filter(
      (p) =>
        (!q ||
          `${p.name} ${p.area} ${p.location} ${p.type} ${p.college}`
            .toLowerCase()
            .includes(q.toLowerCase())) &&
        (!type || p.type === type) &&
        p.price <= rent &&
        (!room || p.room === room) &&
        p.rating >= Number(rating) &&
        (!food || p.food) &&
        (!wifi || p.wifi) &&
        (!ac || p.ac) &&
        (!verified || p.verified),
    );
    if (sort === "priceLow") list.sort((a, b) => a.price - b.price);
    if (sort === "priceHigh") list.sort((a, b) => b.price - a.price);
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [q, type, rent, room, rating, food, wifi, ac, verified, sort]);
  const reset = () => {
    setQ("");
    setType("");
    setRent(20000);
    setRoom("");
    setRating("0");
    setFood(false);
    setWifi(false);
    setAc(false);
    setVerified(false);
    setSort("recommended");
  };
  return (
    <>
      <PageTitle
        eyebrow="DISCOVER YOUR NEXT HOME"
        title="Find a stay that works for you."
        subtitle="25 sample listings across Muradnagar, Modinagar, Raj Nagar, Vaishali, Indirapuram and nearby areas."
      />
      <section className="search-layout">
        <aside className="filters">
          <h3>Filters</h3>
          <label>
            Search
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="College, area, property..."
            />
          </label>
          <label>
            Type
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="">All types</option>
              {["PG", "Flat", "Hostel", "Independent Room"].map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
          <label>
            Maximum rent <span>{money(rent)}</span>
            <input
              type="range"
              min="3000"
              max="20000"
              step="500"
              value={rent}
              onChange={(e) => setRent(Number(e.target.value))}
            />
          </label>
          <label>
            Room type
            <select value={room} onChange={(e) => setRoom(e.target.value)}>
              <option value="">Any room</option>
              {["Single", "Double", "Triple", "1 BHK", "2 BHK"].map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </label>
          <label>
            Minimum rating
            <select value={rating} onChange={(e) => setRating(e.target.value)}>
              <option value="0">Any rating</option>
              <option value="4">4+</option>
              <option value="4.5">4.5+</option>
            </select>
          </label>
          {[
            ["food", "Food available", food, setFood],
            ["wifi", "Wi-Fi", wifi, setWifi],
            ["ac", "AC", ac, setAc],
            ["verified", "Reviewed listing only", verified, setVerified],
          ].map(([id, label, value, setter]) => (
            <div className="check" key={id}>
              <input
                id={id}
                type="checkbox"
                checked={value}
                onChange={(e) => setter(e.target.checked)}
              />
              <label htmlFor={id}>{label}</label>
            </div>
          ))}
          <button className="secondary full" onClick={reset}>
            Reset filters
          </button>
        </aside>
        <section className="results">
          <div className="result-bar">
            <div>
              <strong>{filtered.length}</strong> stays found
            </div>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="recommended">Recommended</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
          <div className="listing-grid">
            {filtered.length ? (
              filtered.map((p) => <PropertyCard key={p.id} p={p} />)
            ) : (
              <div className="empty">
                <span>⌕</span>
                <h3>No stays found</h3>
                <p>Try changing your filters or search area.</p>
              </div>
            )}
          </div>
        </section>
      </section>
    </>
  );
}
function FavouritesPage() {
  const { favourites } = useContext(BaseraContext);
  const list = favourites
    .map((id) => properties.find((p) => p.id === id))
    .filter(Boolean);
  return (
    <>
      <PageTitle
        eyebrow="SAVED FOR LATER"
        title="Your favourites."
        subtitle="Your shortlisted sample stays, saved in this browser."
      />
      <section className="listing-grid content-section">
        {list.length ? (
          list.map((p) => <PropertyCard key={p.id} p={p} />)
        ) : (
          <EmptyState
            icon="♡"
            title="No favourites yet"
            description="Save properties you like and they'll appear here."
            linkText="Explore stays"
            to="/search"
          />
        )}
      </section>
    </>
  );
}
function ComparePage() {
  const { compare, toggleCompare } = useContext(BaseraContext);
  const list = compare
    .map((id) => properties.find((p) => p.id === id))
    .filter(Boolean);
  const rows = [
    ["Type", (p) => p.type],
    ["Monthly rent", (p) => money(p.price)],
    [
      "Estimated extras",
      (p) => money(Object.values(p.monthlyExtras).reduce((a, b) => a + b, 0)),
    ],
    [
      "Estimated total",
      (p) =>
        money(
          p.price + Object.values(p.monthlyExtras).reduce((a, b) => a + b, 0),
        ),
    ],
    ["Deposit", (p) => money(p.deposit)],
    ["Distance", (p) => p.distance + " km"],
    ["Room", (p) => p.room],
    ["Rating", (p) => "★ " + p.rating + " / 5"],
    ["Food", (p) => (p.food ? "Yes" : "No")],
    ["Wi-Fi", (p) => (p.wifi ? "Yes" : "No")],
    ["Availability", (p) => p.availability],
    [
      "Listing review status",
      (p) => (p.verified ? "Details reviewed (demo)" : "Not reviewed"),
    ],
  ];
  return (
    <>
      <PageTitle
        eyebrow="SIDE-BY-SIDE"
        title="Compare your options."
        subtitle="Compare rent, estimated monthly spend, amenities and listing information."
      />
      <section className="compare-area">
        {!list.length ? (
          <EmptyState
            icon="⇄"
            title="Nothing to compare yet"
            description="Go to Find a Stay and add up to four properties."
            linkText="Find stays"
            to="/search"
          />
        ) : (
          <div className="compare-table">
            <table>
              <thead>
                <tr>
                  <th>Feature</th>
                  {list.map((p) => (
                    <th key={p.id}>
                      <div className="compare-img">
                        <img src={p.imageUrl} alt={p.name} />
                      </div>
                      <strong>{p.name}</strong>
                      <button onClick={() => toggleCompare(p.id)}>
                        Remove
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map(([label, fn]) => (
                  <tr key={label}>
                    <td>{label}</td>
                    {list.map((p) => (
                      <td key={p.id}>{fn(p)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
function TrueCost({ p }) {
  const [food, setFood] = useState(p.monthlyExtras.food),
    [electricity, setElectricity] = useState(p.monthlyExtras.electricity),
    [maintenance, setMaintenance] = useState(p.monthlyExtras.maintenance),
    [transport, setTransport] = useState(p.monthlyExtras.transport),
    [internet, setInternet] = useState(p.monthlyExtras.internet);
  const total =
    p.price + food + electricity + maintenance + transport + internet;
  const fields = [
    ["Food / meals", food, setFood],
    ["Electricity", electricity, setElectricity],
    ["Maintenance", maintenance, setMaintenance],
    ["Transport", transport, setTransport],
    ["Internet", internet, setInternet],
  ];
  return (
    <div className="feature-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">BASERA TRUECOST</p>
          <h3>Estimate your monthly spend</h3>
        </div>
        <strong className="big-total">
          {money(total)}
          <small>/ month</small>
        </strong>
      </div>
      <div className="cost-input-grid">
        <div className="cost-line">
          <span>Monthly rent</span>
          <b>{money(p.price)}</b>
        </div>
        {fields.map(([label, value, setter]) => (
          <label className="cost-line" key={label}>
            <span>{label}</span>
            <input
              type="number"
              min="0"
              value={value}
              onChange={(e) => setter(Math.max(0, Number(e.target.value)))}
            />
          </label>
        ))}
      </div>
      <p className="note">
        Adjust the estimates to match your needs. Deposit and one-time moving
        costs are not included. Values are illustrative demo estimates, not
        owner-confirmed charges.
      </p>
    </div>
  );
}
function PropertyPage() {
  const { id } = useParams();
  const p = properties.find((x) => x.id === Number(id)) || properties[0];
  const { favourites, toggleFavourite, compare, toggleCompare } =
    useContext(BaseraContext);
  const [reviews, setReviews] = useState(() =>
    readStore(`baseraReviews_${p.id}`, []),
  );
  const [reviewName, setReviewName] = useState(""),
    [reviewRating, setReviewRating] = useState("5"),
    [reviewText, setReviewText] = useState("");
  const fav = favourites.includes(p.id);
  useEffect(() => {
    document.title = p.name + " | Basera";
    return () => {
      document.title = "Basera | Find Your Place";
    };
  }, [p.name]);
  const submitReview = (e) => {
    e.preventDefault();
    const next = [
      {
        name: reviewName.trim() || "Student",
        rating: Number(reviewRating),
        text: reviewText.trim(),
        date: new Date().toLocaleDateString("en-IN"),
      },
      ...reviews,
    ];
    setReviews(next);
    writeStore(`baseraReviews_${p.id}`, next);
    setReviewName("");
    setReviewText("");
  };
  const extras = Object.values(p.monthlyExtras).reduce((a, b) => a + b, 0);
  return (
    <div className="property-page">
      <div className="breadcrumb">
        <Link to="/search">Find a Stay</Link> / {p.name}
      </div>
      <section className="detail-hero">
        <div className="detail-image">
          <img src={p.imageUrl} alt={p.name} />
        </div>
        <div>
          <div className="type-row">
            <span>{p.type}</span>
            <span className="verified">
              {p.verified ? "✓ Details reviewed (demo)" : "Not yet reviewed"}
            </span>
          </div>
          <h1>{p.name}</h1>
          <p className="location">
            📍 {p.location} · {p.distance} km from college
          </p>
          <div className="rating big">
            ★ {p.rating} <small>{p.reviews} sample reviews</small>
          </div>
          <div className="availability large">{p.availability}</div>
          <div className="detail-price">
            <strong>{money(p.price)}</strong>
            <span>/ month</span>
            <small>Deposit: {money(p.deposit)}</small>
          </div>
          <div className="detail-actions">
            <button
              className="primary"
              onClick={() =>
                alert(
                  `Enquiry demonstration for ${p.name}. Actual enquiry submission will be added with the backend.`,
                )
              }
            >
              Enquire Now →
            </button>
            <button className="outline" onClick={() => toggleFavourite(p.id)}>
              {fav ? "♥ Saved" : "♡ Save"}
            </button>
            <button className="outline" onClick={() => toggleCompare(p.id)}>
              {compare.includes(p.id) ? "✓ Added" : "⇄ Compare"}
            </button>
          </div>
        </div>
      </section>
      <section className="property-tools">
        <TrueCost p={p} />
        <div className="feature-panel">
          <p className="eyebrow">BASERA TRUST DETAILS</p>
          <h3>What has been reviewed?</h3>
          {p.verified ? (
            <>
              <p className="trust-status">
                ✓ Listing details marked as reviewed in this demo
              </p>
              <ul>
                {p.verificationChecks.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </>
          ) : (
            <p>
              This sample listing has not been marked as reviewed. Contact the
              owner and independently verify documents and address before
              paying.
            </p>
          )}
          <p className="note">
            A reviewed badge is not a guarantee of safety, ownership or service
            quality. All verification statuses here are sample data.
          </p>
        </div>
      </section>
      <section className="detail-grid">
        <div className="detail-main">
          <h2>About this stay</h2>
          <p>{p.desc}</p>
          <h2>Amenities</h2>
          <div className="amenity-grid">
            {p.amenities.map((a) => (
              <div key={a}>✓ {a}</div>
            ))}
          </div>
          <h2>Safety information</h2>
          <div className="safety-grid">
            <div>
              <b>{p.safety.cctv ? "Available (demo)" : "Not specified"}</b>
              <span>CCTV</span>
            </div>
            <div>
              <b>{p.safety.security ? "Listed (demo)" : "Not specified"}</b>
              <span>Gated / security</span>
            </div>
            <div>
              <b>{p.safety.lighting ? "Listed (demo)" : "Not specified"}</b>
              <span>Common-area lighting</span>
            </div>
            <div>
              <b>
                {p.safety.emergencyExit ? "Listed (demo)" : "Not specified"}
              </b>
              <span>Emergency exit details</span>
            </div>
          </div>
          <p className="note">{p.safety.note}</p>
          <h2>Student reviews</h2>
          <p className="note">
            The preloaded rating and review count are sample listing data.
            Reviews submitted below are saved only in this browser.
          </p>
          {reviews.map((r, i) => (
            <div className="review" key={`${r.date}-${i}`}>
              <strong>
                {"★".repeat(r.rating)}
                {"☆".repeat(5 - r.rating)}
              </strong>
              <p>{r.text}</p>
              <small>
                — {r.name} · {r.date}
              </small>
            </div>
          ))}
          <form className="review-form" onSubmit={submitReview}>
            <h3>Write a review</h3>
            <label>
              Your name
              <input
                value={reviewName}
                onChange={(e) => setReviewName(e.target.value)}
                placeholder="Optional"
              />
            </label>
            <label>
              Rating
              <select
                value={reviewRating}
                onChange={(e) => setReviewRating(e.target.value)}
              >
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>
                    {n} stars
                  </option>
                ))}
              </select>
            </label>
            <label>
              Your experience
              <textarea
                required
                minLength="10"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Share useful details for other students..."
                rows="4"
              />
            </label>
            <button className="primary">Submit review</button>
          </form>
        </div>
        <aside className="cost-card">
          <h3>Monthly estimate</h3>
          <div>
            <span>Rent</span>
            <strong>{money(p.price)}</strong>
          </div>
          <div>
            <span>Other expenses</span>
            <strong>{money(extras)}</strong>
          </div>
          <div className="total">
            <span>Estimated total</span>
            <strong>{money(p.price + extras)}</strong>
          </div>
          <p>Editable estimate. Confirm all charges with the owner.</p>
          <Link className="outline full-link" to="/safety">
            Safety & reporting guide →
          </Link>
        </aside>
      </section>
    </div>
  );
}
function SafetyPage() {
  const [reports, setReports] = useState(() => readStore("baseraReports", []));
  const [property, setProperty] = useState(""),
    [reason, setReason] = useState("Misleading information"),
    [details, setDetails] = useState("");
  const submit = (e) => {
    e.preventDefault();
    const next = [
      {
        property,
        reason,
        details,
        date: new Date().toLocaleDateString("en-IN"),
      },
      ...reports,
    ];
    setReports(next);
    writeStore("baseraReports", next);
    setProperty("");
    setDetails("");
    alert(
      "Report saved in this browser demo. No moderation team has been notified.",
    );
  };
  return (
    <>
      <PageTitle
        eyebrow="STUDENT SAFETY & TRUST"
        title="Make informed, safer decisions."
        subtitle="Use this checklist before visiting, sharing documents or paying a deposit."
      />
      <section className="safety-page">
        <div className="safety-info">
          <div className="feature-panel">
            <h2>Before you pay or move in</h2>
            <ul className="safety-checklist">
              <li>Visit the property in person and inspect the actual room.</li>
              <li>
                Verify the owner's identity and authority to rent the property.
              </li>
              <li>
                Ask for a written agreement, rent, deposit and refund terms.
              </li>
              <li>
                Confirm electricity, food, maintenance and brokerage charges.
              </li>
              <li>
                Check locks, entry controls, lighting, fire exits and emergency
                access.
              </li>
              <li>
                Do not transfer money based only on photos or urgent messages.
              </li>
              <li>Keep receipts and copies of all signed documents.</li>
            </ul>
          </div>
          <div className="feature-panel">
            <h3>Emergency help (India)</h3>
            <div className="emergency-number">
              <strong>112</strong>
              <span>National emergency response number</span>
            </div>
            <p className="note">
              If you are in immediate danger, move to a safer public place and
              contact local emergency services. Confirm current local support
              options where you live.
            </p>
          </div>
        </div>
        <form className="feature-panel report-form" onSubmit={submit}>
          <p className="eyebrow">BASERA REPORT A LISTING</p>
          <h2>Report suspicious information</h2>
          <p>
            Flag a listing that appears misleading, duplicated or unsafe. This
            prototype stores reports locally and does not send them to an admin.
          </p>
          <label>
            Property
            <select
              required
              value={property}
              onChange={(e) => setProperty(e.target.value)}
            >
              <option value="">Choose a listing</option>
              {properties.map((p) => (
                <option key={p.id} value={p.name}>
                  {p.name} — {p.area}
                </option>
              ))}
            </select>
          </label>
          <label>
            Reason
            <select value={reason} onChange={(e) => setReason(e.target.value)}>
              {[
                "Misleading information",
                "Suspicious payment request",
                "Duplicate listing",
                "Incorrect photos or address",
                "Safety concern",
                "Other",
              ].map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </label>
          <label>
            Details
            <textarea
              required
              minLength="10"
              rows="5"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Describe what you noticed. Do not include sensitive personal information."
            />
          </label>
          <button className="primary">Submit report</button>
        </form>
      </section>
    </>
  );
}
function OwnerPage() {
  const [submitted, setSubmitted] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    e.currentTarget.reset();
  };
  return (
    <>
      <PageTitle
        eyebrow="FOR PROPERTY OWNERS"
        title="List your property on Basera."
        subtitle="Reach students looking for their next place to stay."
      />
      <section className="form-card">
        <form onSubmit={submit}>
          <div className="form-grid">
            <label>
              Property name
              <input name="name" required placeholder="e.g. Green View PG" />
            </label>
            <label>
              Property type
              <select name="type">
                <option>PG</option>
                <option>Flat</option>
                <option>Hostel</option>
                <option>Independent Room</option>
              </select>
            </label>
            <label>
              Area
              <input name="area" required placeholder="e.g. Muradnagar" />
            </label>
            <label>
              Monthly rent
              <input
                name="price"
                required
                type="number"
                min="1"
                placeholder="8000"
              />
            </label>
            <label>
              Room type
              <select name="room">
                <option>Single</option>
                <option>Double</option>
                <option>Triple</option>
                <option>1 BHK</option>
                <option>2 BHK</option>
              </select>
            </label>
            <label>
              Distance from college
              <input name="distance" placeholder="e.g. 1.2 km" />
            </label>
            <label className="wide">
              Amenities
              <input name="amenities" placeholder="Wi-Fi, Food, AC, Laundry" />
            </label>
            <label className="wide">
              Description
              <textarea
                name="description"
                rows="5"
                placeholder="Tell students about the property..."
              />
            </label>
          </div>
          <button className="primary" type="submit">
            Submit Property →
          </button>
        </form>
        {submitted && (
          <div className="success">
            ✓ Property form submitted in this frontend demonstration. It is not
            published; backend storage and admin review will be added in
            Semester 2.
          </div>
        )}
      </section>
    </>
  );
}
export default function App() {
  const [favourites, setFavourites] = useState(() => readStore("baseraFavs"));
  const [compare, setCompare] = useState(() => readStore("baseraCompare"));
  useEffect(() => writeStore("baseraFavs", favourites), [favourites]);
  useEffect(() => writeStore("baseraCompare", compare), [compare]);
  const toggleFavourite = (id) =>
    setFavourites((a) =>
      a.includes(id) ? a.filter((x) => x !== id) : [...a, id],
    );
  const toggleCompare = (id) =>
    setCompare((a) => {
      if (a.includes(id)) return a.filter((x) => x !== id);
      if (a.length >= 4) {
        alert("You can compare up to 4 properties.");
        return a;
      }
      return [...a, id];
    });
  const value = { favourites, compare, toggleFavourite, toggleCompare };
  return (
    <BaseraContext.Provider value={value}>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/property/:id" element={<PropertyPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/favourites" element={<FavouritesPage />} />
          <Route path="/owner" element={<OwnerPage />} />
          <Route path="/safety" element={<SafetyPage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </BaseraContext.Provider>
  );
}
