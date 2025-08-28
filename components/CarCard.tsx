import CarImageCard from './CarImageCard'
import { Car } from '@/types'

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  return <CarImageCard car={car} />
}