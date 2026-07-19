import { prisma } from "@/lib/prisma";
import AdminShell from "@/components/admin/AdminShell";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [slides, offerings, packages, jobs, testimonials, investments, unreadContacts] = await Promise.all([
    prisma.heroSlide.count(),
    prisma.offering.count(),
    prisma.package.count(),
    prisma.job.count({ where: { isActive: true } }),
    prisma.testimonial.count(),
    prisma.investment.count({ where: { isActive: true } }),
    prisma.contactSubmission.count({ where: { isRead: false } }),
  ]);

  const cards = [
    { label: "Hero Slides", value: slides, href: "/admin/hero-slides" },
    { label: "Services Offered", value: offerings, href: "/admin/offerings" },
    { label: "Packages", value: packages, href: "/admin/packages" },
    { label: "Open Jobs", value: jobs, href: "/admin/jobs" },
    { label: "Testimonials", value: testimonials, href: "/admin/testimonials" },
    { label: "Active Investments", value: investments, href: "/admin/investments" },
    { label: "Unread Messages", value: unreadContacts, href: "/admin/contacts", alert: unreadContacts > 0 },
  ];

  return (
    <AdminShell>
      <h1 className="font-display text-xl font-semibold text-[#171717]">Overview</h1>
      <p className="mt-0.5 text-[13px] text-[#8F8F8F]">Manage everything shown on the public Ultrafy Networks site.</p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Link key={c.href} href={c.href} className="av-card block p-5">
            <div className="flex items-start justify-between">
              <p className="font-mono text-[28px] font-semibold leading-none text-[#171717]">{c.value}</p>
              {c.alert && <span className="h-2 w-2 rounded-full bg-[#EE0000]" />}
            </div>
            <p className="mt-2 text-[13px] text-[#8F8F8F]">{c.label}</p>
          </Link>
        ))}
      </div>
    </AdminShell>
  );
}
