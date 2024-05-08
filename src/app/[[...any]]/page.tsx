import { notFound } from "next/navigation";

const page: React.FC<{
  children?: React.ReactNode;
}> = () => {
  notFound();
};

export default page;
