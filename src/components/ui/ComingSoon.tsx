import { Card } from './Card'
import { PageHeader } from './PageHeader'

export default function ComingSoon({ title }: { title: string }) {
  return (
    <>
      <PageHeader title={title} subtitle="This page is planned for the next phase." />
      <Card>Coming soon.</Card>
    </>
  )
}
