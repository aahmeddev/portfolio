import { Icons } from "@/components/common/icons";

interface SocialInterface {
  name: string;
  username: string;
  icon: any;
  link: string;
}

export const SocialLinks: SocialInterface[] = [
  {
    name: "GitHub",
    username: "@aahmeddev",
    icon: Icons.gitHub,
    link: "https://github.com/aahmeddev",
  },
  {
    name: "LinkedIn",
    username: "in/ahmediaahmed",
    icon: Icons.linkedin,
    link: "https://www.linkedin.com/in/ahmediaahmed",
  },
  {
    name: "Email",
    username: "ahmed.ia.ahmed@gmail.com",
    icon: Icons.gmail,
    link: "mailto:ahmed.ia.ahmed@gmail.com",
  },
];
