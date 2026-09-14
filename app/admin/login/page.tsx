import Image from "next/image";
import { loginAction } from "@/app/admin/actions";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const session = await getSession();
  if (session) redirect("/admin");
  const { next, error } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-5">
      <div className="w-full max-w-md rounded-[28px] border border-gold/15 bg-ink-elevated p-8">
        <Image
          src="/branding/lynora-logo.png"
          alt="Lynora"
          width={734}
          height={632}
          className="mx-auto h-auto w-44"
          priority
        />
        <p className="mt-5 text-center text-[0.7rem] tracking-[0.22em] uppercase text-gold">
          Private studio admin
        </p>
        <form action={loginAction} className="mt-8 space-y-4">
          <input type="hidden" name="next" value={next || "/admin"} />
          <div>
            <label htmlFor="admin-email" className="block text-xs tracking-[0.16em] uppercase text-stone">
              Email
            </label>
            <input
              id="admin-email"
              name="email"
              type="email"
              autoComplete="username"
              required
              className="mt-2 w-full rounded-[16px] border border-gold/15 bg-ink px-4 py-3 text-sm text-ivory"
            />
          </div>
          <div>
            <label htmlFor="admin-password" className="block text-xs tracking-[0.16em] uppercase text-stone">
              Password
            </label>
            <input
              id="admin-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="mt-2 w-full rounded-[16px] border border-gold/15 bg-ink px-4 py-3 text-sm text-ivory"
            />
          </div>
          {error ? <p className="text-sm text-red-300">Those details were not recognised.</p> : null}
          <button className="w-full rounded-full bg-gold py-3 text-[0.72rem] tracking-[0.2em] uppercase text-ink">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
