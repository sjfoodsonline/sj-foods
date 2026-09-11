import { createFileRoute } from "@tanstack/react-router";
import { type FormEvent, useState } from "react";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMarket } from "@/store/market";

export const Route = createFileRoute("/apply")({ component: ApplyPage });

function ApplyPage() {
  const apply = useMarket((s) => s.apply);
  const applications = useMarket((s) => s.applications);
  const [name, setName] = useState("");
  const [city, setCity] = useState("Mingora");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [done, setDone] = useState(false);

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    apply({ name: name.trim(), city: city.trim() || "Mingora", phone: phone.trim(), note: note.trim() });
    setDone(true);
    setName("");
    setPhone("");
    setNote("");
  }

  return (
    <SiteShell>
      <div className="mx-auto max-w-xl px-4 py-14">
        <h1 className="font-display text-4xl text-forest-900">Become a vendor</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Aapki shop tabhi live hogi jab owner approve kare. Categories, units aur pricing
          aap decide nahi karte — SJ Online ka standard follow hoga. Har approved vendor ko
          apni shop page milti hai.
        </p>
        <form onSubmit={submit} className="mt-8 space-y-4 rounded-xl border border-line bg-cream p-6">
          <div>
            <Label htmlFor="v-name">Shop name</Label>
            <Input id="v-name" className="mt-1" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="v-city">City</Label>
            <Input id="v-city" className="mt-1" value={city} onChange={(e) => setCity(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="v-phone">WhatsApp</Label>
            <Input id="v-phone" className="mt-1" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="03xx..." />
          </div>
          <div>
            <Label htmlFor="v-note">Note</Label>
            <Input id="v-note" className="mt-1" value={note} onChange={(e) => setNote(e.target.value)} />
          </div>
          <Button type="submit" variant="gold" className="w-full">
            Submit for approval
          </Button>
          {done ? (
            <p className="text-center text-sm text-forest-800">Request owner desk pe chali gayi.</p>
          ) : null}
        </form>
        {applications.length > 0 ? (
          <ul className="mt-8 space-y-2 text-sm">
            {applications.map((a) => (
              <li key={a.id} className="flex justify-between rounded-md border border-line bg-paper px-3 py-2">
                <span>{a.name}</span>
                <span className="text-muted">{a.status}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </SiteShell>
  );
}
