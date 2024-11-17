
import HomeClient from './components/Home';

export const metadata = {
  title: "Home page title",
  description: "Home page description"
}

export default function HomeServer() {
  return <HomeClient />
}
