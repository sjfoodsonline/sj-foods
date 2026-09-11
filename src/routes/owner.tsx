import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CATEGORIES, UNITS } from "@/lib/catalog";
import { useMarket } from "@/store/market";

export const Route = createFileRoute("/owner")({ component: OwnerPage });

function OwnerPage() {
  const { whatsapp, setWhatsapp, applications, decide } = useMarket();

  return (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-4 py-14">
        <h1 className="font-display text-4xl text-forest-900">Owner desk</h1>
        <p className="mt-2 text-sm text-muted">
          Full control: vendors approve/reject, WhatsApp number, shared categories and units.
        </p>

        <section className="mt-8 rounded-xl border border-line bg-cream p-6">
          <h2 className="font-display text-xl text-forest-900">WhatsApp for orders</h2>
          <Label htmlFor="wa" className="mt-4 block">
            Number with country code
          </Label>
          <Input
            id="wa"
            className="mt-1"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
          />
          <p className="mt-2 text-xs text-muted">Cart se orders isi number pe message ban kar khulte hain.</p>
        </section>

        <section className="mt-6 rounded-xl border border-line bg-paper p-6">
          <h2 className="font-display text-xl text-forest-900">Standard categories</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <li key={c.slug} className="rounded-full border border-line bg-cream px-3 py-1 text-sm">
                {c.name}
              </li>
            ))}
          </ul>
          <h3 className="mt-6 text-sm font-medium text-forest-900">Units for everyone</h3>
          <p className="mt-2 text-sm text-muted">{UNITS.join(" · ")}</p>
        </section>

        <section className="mt-6 rounded-xl border border-line bg-paper p-6">
          <h2 className="font-display text-xl text-forest-900">Vendor requests</h2>
          {applications.length === 0 ? (
            <p className="mt-3 text-sm text-muted">Koi pending request nahi.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {applications.map((a) => (
                <li key={a.id} className="rounded-lg border border-line p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-forest-900">{a.name}</p>
                      <p className="text-xs text-muted">
                        {a.city} · {a.phone || "no phone"} · {a.status}
                      </p>
                      {a.note ? <p className="mt-1 text-sm text-muted">{a.note}</p> : null}
                    </div>
                    {a.status === "pending" ? (
                      <div className="flex gap-2">
                        <Button size="sm" variant="gold" onClick={() => decide(a.id, "approved")}>
                          Approve
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => decide(a.id, "rejected")}>
                          Reject
                        </Button>
                      </div>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </SiteShell>
  );
}
