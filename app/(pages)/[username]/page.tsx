import DefaultTemplate from "@/app/template/default/page";

async function getUserData(username: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/${username}`,
    {
      cache: "no-store", // Ensures fresh data
    }
  );

  if (!res.ok) {
    return null;
  }

  const data = await res.json();
  return {
    ...data.user,
    stats: data.stats,
    social: data.social,
    project: data.project,
    setup : data.setup
  };
}

export default async function UserPage({
  params,
}: {
  params: { username: string };
}) {
  const { username } = await params;
  const user = await getUserData(username);

  const stats = user?.stats || [];
  const social = user?.social || {};
  const project = user?.project || [];
  const setup = user?.setup || {};



 

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl"> User not found</p>
      </div>
    );
  }


  return (

    <div>

      <DefaultTemplate user={user} stats={stats} social={social} project={project} setup={setup} />
    </div>
  );
}

