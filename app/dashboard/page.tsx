import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

import {
  getSearchConsoleSummary,
  getTopQueries,
  getTopPages,
  getSearchConsoleHistory,
} from "@/lib/gsc-client";

import {
  getGA4Summary,
  getGA4History,
} from "@/lib/ga4-client";

import TrafficChart from "@/components/charts/TrafficChart";


export default async function Dashboard() {

  const session =
    await getServerSession(
      authOptions
    );

  if (!session?.refreshToken) {

    return (

      <main className="p-10">

        <h1>
          Silakan login terlebih dahulu
        </h1>

      </main>

    );

  }


  const refreshToken =
    session.refreshToken as string;



  let data = {

    clicks: 0,

    impressions: 0,

  };


  let queries: any[] = [];


  let pages: any[] = [];


  let ga4 = {

    users: 0,

    sessions: 0,

    pageViews: 0,

    engagementRate: 0,

  };


  let gscHistory: any[] = [];


  let ga4History: any[] = [];



  try {
    
  [
    data,
    queries,
    pages,
    ga4,
    gscHistory,
    ga4History,

  ] = await Promise.all([

    getSearchConsoleSummary(
      refreshToken,
      "sc-domain:yaplegal.id"
    ),

    getTopQueries(
      refreshToken,
      "sc-domain:yaplegal.id"
    ),

    getTopPages(
      refreshToken,
      "sc-domain:yaplegal.id"
    ),

    getGA4Summary(
      refreshToken,
      "530690262"
    ),

    getSearchConsoleHistory(
      refreshToken,
      "sc-domain:yaplegal.id"
    ),

    getGA4History(
      refreshToken,
      "530690262"
    ),

  ]);

} catch (error) {

  console.error(
    "DASHBOARD ERROR:",
    error
  );

}

  const clicksHistory = gscHistory.map(
  (item: any) => {
    const raw =
      item.keys?.[0] || "";

    const parts =
      raw.split("-");

    const month =
      parts[1];

    const day =
      parts[2];

    const monthMap: Record<
      string,
      string
    > = {
      "01": "Jan",
      "02": "Feb",
      "03": "Mar",
      "04": "Apr",
      "05": "Mei",
      "06": "Jun",
      "07": "Jul",
      "08": "Agu",
      "09": "Sep",
      "10": "Okt",
      "11": "Nov",
      "12": "Des",
    };

    return {
      date: `${day} ${monthMap[month]}`,

      clicks: Number(
        item.clicks || 0
      ),

      impressions: Number(
        item.impressions || 0
      ),
    };
  }
);

  const usersHistory = ga4History
  .map((item: any) => {
    const raw =
      item.dimensionValues?.[0]?.value || "";

    const month = raw.slice(4, 6);
    const day = raw.slice(6, 8);

    const monthMap: Record<
      string,
      string
    > = {
      "01": "Jan",
      "02": "Feb",
      "03": "Mar",
      "04": "Apr",
      "05": "Mei",
      "06": "Jun",
      "07": "Jul",
      "08": "Agu",
      "09": "Sep",
      "10": "Okt",
      "11": "Nov",
      "12": "Des",
    };

    return {
      rawDate: raw,

      date: `${day} ${monthMap[month]}`,

      users: Number(
        item.metricValues?.[0]?.value || 0
      ),

      sessions: Number(
        item.metricValues?.[1]?.value || 0
      ),
    };
  })
  .sort(
    (a: any, b: any) =>
      Number(a.rawDate) -
      Number(b.rawDate)
  );

  const clicks =
    data.clicks ?? 0;

  const impressions =
    data.impressions ?? 0;

  const ctr =
    impressions > 0
      ? (
          (clicks /
            impressions) *
          100
        ).toFixed(2)
      : "0";

  return (
    <main className="p-10">
      <h1 className="mb-8 text-3xl font-bold">
        YAPLegal SEO Dashboard 🚀
      </h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="rounded-lg border p-6">
          <h2 className="text-sm text-gray-500">
            Clicks
          </h2>

          <p className="mt-2 text-3xl font-bold">
            {clicks.toLocaleString()}
          </p>
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="text-sm text-gray-500">
            Impressions
          </h2>

          <p className="mt-2 text-3xl font-bold">
            {impressions.toLocaleString()}
          </p>
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="text-sm text-gray-500">
            CTR
          </h2>

          <p className="mt-2 text-3xl font-bold">
            {ctr}%
          </p>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-6">
        <div className="rounded-lg border p-6">
          <h2 className="mb-4 text-xl font-bold">
            Top Keywords 🔥
          </h2>

          <table className="w-full">
            <tbody>
              {queries.map(
                (query: any) => (
                  <tr
                    key={
                      query.keys?.[0]
                    }
                    className="border-b"
                  >
                    <td className="py-2">
                      {
                        query.keys?.[0]
                      }
                    </td>

                    <td className="py-2 text-right">
                      {query.clicks.toLocaleString()}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="mb-4 text-xl font-bold">
            Top Pages 📄
          </h2>

          <table className="w-full">
            <tbody>
              {pages.map(
                (page: any) => (
                  <tr
                    key={
                      page.keys?.[0]
                    }
                    className="border-b"
                  >
                    <td className="py-2">
                      {page.keys?.[0]
                        ?.replace(
                          "https://yaplegal.id",
                          ""
                        )
                        .slice(
                          0,
                          50
                        )}
                    </td>

                    <td className="py-2 text-right">
                      {page.clicks.toLocaleString()}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="mb-4 text-2xl font-bold">
          Google Analytics 4 📈
        </h2>

        <div className="grid grid-cols-4 gap-6">
          <div className="rounded-lg border p-6">
            <h3 className="text-sm text-gray-500">
              Users
            </h3>

            <p className="mt-2 text-3xl font-bold">
              {ga4.users.toLocaleString()}
            </p>
          </div>

          <div className="rounded-lg border p-6">
            <h3 className="text-sm text-gray-500">
              Sessions
            </h3>

            <p className="mt-2 text-3xl font-bold">
              {ga4.sessions.toLocaleString()}
            </p>
          </div>

          <div className="rounded-lg border p-6">
            <h3 className="text-sm text-gray-500">
              Page Views
            </h3>

            <p className="mt-2 text-3xl font-bold">
              {ga4.pageViews.toLocaleString()}
            </p>
          </div>

          <div className="rounded-lg border p-6">
            <h3 className="text-sm text-gray-500">
              Engagement Rate
            </h3>

            <p className="mt-2 text-3xl font-bold">
              {(
                ga4.engagementRate *
                100
              ).toFixed(2)}
              %
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <TrafficChart
          title="Clicks Trend"
          data={clicksHistory}
          dataKey="clicks"
        />
      </div>

      <div className="mt-10">
        <TrafficChart
          title="Impressions Trend"
          data={clicksHistory}
          dataKey="impressions"
        />
      </div>

      <div className="mt-10">
        <TrafficChart
          title="Users Trend"
          data={usersHistory}
          dataKey="users"
        />
      </div>

      <div className="mt-10">
        <TrafficChart
          title="Sessions Trend"
          data={usersHistory}
          dataKey="sessions"
        />
      </div>
    </main>
  );
}
