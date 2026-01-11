"use client";

import { login } from "@/lib/actions/auth";
import { useActionState } from "react";

export default function LoginPage() {
  const [state, formAction] = useActionState(login, null);
  return (
    <div className="flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">管理者ログイン</h1>

        <form action={formAction}>
          <div className="flex flex-col space-y-4">
            <input
              className="border border-gray-300 rounded p-2"
              name="username"
              type="text"
              placeholder="username"
              required
              defaultValue={state?.username}
            />
            <input
              className="border border-gray-300 rounded p-2"
              name="password"
              type="password"
              placeholder="password"
              required
            />
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              type="submit"
            >
              ログイン
            </button>
            {state?.error && <p className="text-red-500">{state?.error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}
