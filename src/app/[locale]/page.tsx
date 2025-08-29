import '../../styles/homepage/styles.css';
import CreateBoard from '@/components/forms/create-board';

export default function HomePage() {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <CreateBoard />
    </main>
  )
}
