import { prisma } from '@/lib/prisma';
import SiteShell from '@/components/SiteShell';
import { notFound } from 'next/navigation';

interface ProjectPageProps {
  params: { id: string };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = params;

  const project = await prisma.project.findUnique({
    where: { id },
    include: { pages: { orderBy: { createdAt: 'asc' }, take: 1 } },
  });

  if (!project) {
    notFound();
  }

  const page = project.pages[0];

  return (
    <SiteShell>
      <h1 className="mb-4 text-3xl font-semibold">{project.title}</h1>
      {page && (
        <article dangerouslySetInnerHTML={{ __html: page.content }} />
      )}
    </SiteShell>
  );
}
