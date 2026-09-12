import { Pencil, PlusCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { AdminAuthError } from "../api/adminClient";
import { FixturesAdminAPI } from "../api/fixtures.admin";
import { RegistrationsAdminAPI } from "../api/registrations.admin";
import { TournamentsAdminAPI } from "../api/tournaments.admin";
import AdminModal from "../components/AdminModal";
import { useAdminAuth } from "../context/AdminAuthContext";
import "../css/Admin.css";

const STATUS_LABEL = {
  upcoming: "Upcoming",
  live: "Live",
  finished: "Finished",
};

const EMPTY_FORM = {
  tournamentId: "",
  homeTeamId: "",
  awayTeamId: "",
  venue: "",
  date: "",
  time: "",
  status: "upcoming",
  scoreA: "",
  scoreB: "",
};

// Teams only exist once a registration is approved — there's no dedicated
// /teams endpoint, so we derive the picker options from approved
// registrations instead (each carries a teamId once approved).
function deriveTeams(registrations) {
  const byId = new Map();
  for (const reg of registrations) {
    if (reg.status === "APPROVED" && reg.teamId) {
      byId.set(reg.teamId, { id: reg.teamId, name: reg.teamName });
    }
  }
  return Array.from(byId.values()).sort((a, b) => a.name.localeCompare(b.name));
}

export default function FixturesAdmin() {
  const { logout } = useAdminAuth();

  const [fixtures, setFixtures] = useState([]);
  const [teams, setTeams] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingFixture, setEditingFixture] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  const loadAll = async () => {
    setLoading(true);
    setError("");
    try {
      const [fixturesData, registrationsData, tournamentsData] =
        await Promise.all([
          FixturesAdminAPI.getAll(),
          RegistrationsAdminAPI.getAll(),
          TournamentsAdminAPI.getAll(),
        ]);

      setFixtures(
        Array.isArray(fixturesData) ? fixturesData : (fixturesData?.data ?? []),
      );

      const registrations = Array.isArray(registrationsData)
        ? registrationsData
        : (registrationsData?.data ?? []);
      setTeams(deriveTeams(registrations));

      setTournaments(
        Array.isArray(tournamentsData)
          ? tournamentsData
          : (tournamentsData?.data ?? []),
      );
    } catch (err) {
      if (err instanceof AdminAuthError) {
        logout();
        return;
      }
      setError(err.message || "Failed to load fixtures.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const teamNameById = useMemo(() => {
    const map = new Map();
    for (const t of teams) map.set(String(t.id), t.name);
    return map;
  }, [teams]);

  const openCreateModal = () => {
    setEditingFixture(null);
    setForm(EMPTY_FORM);
    setFormError("");
    setModalOpen(true);
  };

  const openEditModal = (fixture) => {
    setEditingFixture(fixture);
    setForm({
      tournamentId: String(fixture.tournamentId ?? ""),
      homeTeamId: String(fixture.homeTeamId ?? ""),
      awayTeamId: String(fixture.awayTeamId ?? ""),
      venue: fixture.venue || "",
      date: fixture.date || "",
      time: fixture.time || "",
      status: fixture.status || "upcoming",
      scoreA: fixture.scoreA ?? "",
      scoreB: fixture.scoreB ?? "",
    });
    setFormError("");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingFixture(null);
    setFormError("");
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (
      !form.tournamentId ||
      !form.homeTeamId ||
      !form.awayTeamId ||
      !form.venue.trim() ||
      !form.date ||
      !form.time
    ) {
      setFormError("Please fill in all required fields.");
      return;
    }
    if (form.homeTeamId === form.awayTeamId) {
      setFormError("Home and away teams must be different.");
      return;
    }

    const payload = {
      tournamentId: Number(form.tournamentId),
      homeTeamId: Number(form.homeTeamId),
      awayTeamId: Number(form.awayTeamId),
      venue: form.venue.trim(),
      date: form.date,
      time: form.time,
      status: form.status,
      scoreA: form.scoreA === "" ? null : Number(form.scoreA),
      scoreB: form.scoreB === "" ? null : Number(form.scoreB),
    };

    setSaving(true);
    try {
      if (editingFixture) {
        await FixturesAdminAPI.update(editingFixture.id, payload);
      } else {
        await FixturesAdminAPI.create(payload);
      }
      closeModal();
      await loadAll();
    } catch (err) {
      if (err instanceof AdminAuthError) {
        logout();
        return;
      }
      setFormError(err.message || "Failed to save fixture.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>Fixtures</h1>
          <p>Create and update match fixtures.</p>
        </div>
        <button className="btn admin-add-btn" onClick={openCreateModal}>
          <PlusCircle size={16} />
          Add fixture
        </button>
      </div>

      {teams.length === 0 && !loading && (
        <p className="admin-inline-note">
          No teams available yet — a team only appears here once a registration
          for it has been approved.
        </p>
      )}

      {loading && <p className="admin-empty-state">Loading fixtures…</p>}
      {!loading && error && (
        <p className="admin-empty-state admin-error-text">{error}</p>
      )}

      {!loading && !error && (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Tournament</th>
                <th>Match</th>
                <th>Date &amp; time</th>
                <th>Venue</th>
                <th>Status</th>
                <th>Score</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {fixtures.length === 0 && (
                <tr>
                  <td colSpan={7} className="admin-empty-state">
                    No fixtures yet.
                  </td>
                </tr>
              )}
              {fixtures.map((fx) => (
                <tr key={fx.id}>
                  <td>{fx.tournament?.name || "—"}</td>
                  <td className="admin-table-strong">
                    {fx.teamA || teamNameById.get(String(fx.homeTeamId)) || "?"}{" "}
                    <span className="admin-table-sub">vs</span>{" "}
                    {fx.teamB || teamNameById.get(String(fx.awayTeamId)) || "?"}
                  </td>
                  <td>
                    {fx.date}
                    <div className="admin-table-sub">{fx.time}</div>
                  </td>
                  <td>{fx.venue}</td>
                  <td>
                    <span
                      className={`admin-status-badge admin-status-${fx.status}`}
                    >
                      {STATUS_LABEL[fx.status] || fx.status}
                    </span>
                  </td>
                  <td>
                    {fx.scoreA != null && fx.scoreB != null
                      ? `${fx.scoreA} – ${fx.scoreB}`
                      : "—"}
                  </td>
                  <td>
                    <button
                      className="admin-icon-btn"
                      onClick={() => openEditModal(fx)}
                      title="Edit fixture"
                    >
                      <Pencil size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modalOpen && (
        <AdminModal
          title={editingFixture ? "Edit fixture" : "Add fixture"}
          onClose={closeModal}
        >
          <form onSubmit={handleSubmit} className="admin-form">
            <div className="admin-form-group">
              <label className="admin-form-label">Tournament</label>
              <select
                className="admin-form-select"
                value={form.tournamentId}
                onChange={handleChange("tournamentId")}
              >
                <option value="">Select tournament…</option>
                {tournaments.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="admin-form-row">
              <div className="admin-form-group">
                <label className="admin-form-label">Home team</label>
                <select
                  className="admin-form-select"
                  value={form.homeTeamId}
                  onChange={handleChange("homeTeamId")}
                >
                  <option value="">Select team…</option>
                  {teams.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Away team</label>
                <select
                  className="admin-form-select"
                  value={form.awayTeamId}
                  onChange={handleChange("awayTeamId")}
                >
                  <option value="">Select team…</option>
                  {teams.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Venue</label>
              <input
                className="admin-form-input"
                type="text"
                value={form.venue}
                onChange={handleChange("venue")}
                placeholder="e.g. Pesa Cup Ground, Kathmandu"
              />
            </div>

            <div className="admin-form-row">
              <div className="admin-form-group">
                <label className="admin-form-label">Date</label>
                <input
                  className="admin-form-input"
                  type="date"
                  value={form.date}
                  onChange={handleChange("date")}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Time</label>
                <input
                  className="admin-form-input"
                  type="time"
                  value={form.time}
                  onChange={handleChange("time")}
                />
              </div>
            </div>

            <div className="admin-form-row">
              <div className="admin-form-group">
                <label className="admin-form-label">Status</label>
                <select
                  className="admin-form-select"
                  value={form.status}
                  onChange={handleChange("status")}
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="live">Live</option>
                  <option value="finished">Finished</option>
                </select>
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Score (optional)</label>
                <div className="admin-form-score-row">
                  <input
                    className="admin-form-input"
                    type="number"
                    min="0"
                    value={form.scoreA}
                    onChange={handleChange("scoreA")}
                    placeholder="Home"
                  />
                  <span className="admin-form-score-sep">–</span>
                  <input
                    className="admin-form-input"
                    type="number"
                    min="0"
                    value={form.scoreB}
                    onChange={handleChange("scoreB")}
                    placeholder="Away"
                  />
                </div>
              </div>
            </div>

            {formError && <p className="admin-form-error">{formError}</p>}

            <div className="admin-modal-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button type="submit" className="btn" disabled={saving}>
                {saving
                  ? "Saving…"
                  : editingFixture
                    ? "Save changes"
                    : "Create fixture"}
              </button>
            </div>
          </form>
        </AdminModal>
      )}
    </div>
  );
}
