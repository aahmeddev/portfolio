import { Icons } from "@/components/common/icons";

interface SocialInterface {
  name: string;
  username: string;
  icon: any;
  link: string;
}

export const SocialLinks: SocialInterface[] = [
  {
    name: "Github",
    username: "@aahmeddev",
    icon: Icons.gitHub,
    link: "https://github.com/aahmeddev",
  },
  {
    name: "LinkedIn",
    username: "Ahmed Ahmed",
    icon: Icons.linkedin,
    link: "https://www.linkedin.com/in/ahmed-ahmed-37554021a/",
  }
];
