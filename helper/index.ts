// import { addEditableTags } from "@contentstack/utils";
import { Page } from "../typescript/pages";
import getConfig from "next/config";
import { FooterProps,HeaderProps} from "../typescript/layout";
import { getEntry, getEntryById, getEntryByUrl } from "../contentstack-sdk";
import { Header } from "next/dist/lib/load-custom-routes";

// const { publicRuntimeConfig } = getConfig();
// const envConfig = process.env.CONTENTSTACK_API_KEY
//   ? process.env
//   : publicRuntimeConfig;

// const liveEdit = envConfig.CONTENTSTACK_LIVE_EDIT_TAGS === "true";
interface NavigationLink {
  title: string;
  href: string;
}

interface SocialLink {
  title: string;
  href: string;
  icon: string;
}

export interface Footerschema {
  navigation: NavigationLink[];
  social: SocialLink[];
  logo: string;
  copyright?: string;
}
//For navbar
export const getHeaderRes = async (): Promise<HeaderProps> => {
  const response = (await getEntry({
    contentTypeUid: "aryan_navbar",
    referenceFieldPath: ["navigation_menu.page_reference"],
    jsonRtePath: undefined,
  })) as HeaderProps[][];

  return response[0][0];
};

export const getNavbar=async():Promise<HeaderProps> => {
  const response = (await getEntryByUrl({
    contentTypeUid: "aryan_navbar",
    entryUrl: "/",
    referenceFieldPath: ["navigation_menu.page_reference"],
    jsonRtePath: undefined,
  })) as HeaderProps[][];
  return response[0][0];
}


//for footer
export const getFooterRes = async (): Promise<FooterProps> => {
  const response = (await getEntry({
    contentTypeUid: "footer_aryan",
    referenceFieldPath: undefined,
    jsonRtePath: undefined,
  })) as FooterProps[][];
  return response[0][0];
};

//for getting all pages 
export const getAllEntries = async (): Promise<Page[]> => {
  const response = (await getEntry({
    contentTypeUid: "common_page",
    referenceFieldPath: undefined,
    jsonRtePath: undefined,
  })) as Page[][];
  return response[0];
};

//for geting single page
export const getPageRes = async (entryUrl: string): Promise<Page> => {
  const response = (await getEntryByUrl({
    contentTypeUid: "common_page",
    entryUrl,
    referenceFieldPath: undefined,
    jsonRtePath: undefined
  })) as Page[];
  return response[0];
};

//for getting skills page
export const getSkillsRes = async (entryUrl: string): Promise<Page> => {
  const response = (await getEntryByUrl({
    contentTypeUid: "common_page",
    entryUrl:"/skills",
    referenceFieldPath: undefined,
    jsonRtePath: undefined
  })) as Page[];
  return response[0];
};

//for getting About page
export const getAboutRes = async (entryUrl: string): Promise<Page> => {
  const response = (await getEntryByUrl({
    contentTypeUid: "common_page",
    entryUrl:"/about",
    referenceFieldPath: undefined,
    jsonRtePath: undefined
  })) as Page[];
  return response[0];
};

//for getting Projects page
export const getProjectsRes = async (entryUrl: string): Promise<Page> => {
  const response = (await getEntryByUrl({
    contentTypeUid: "common_page",
    entryUrl:"/projects",
    referenceFieldPath: undefined,
    jsonRtePath: undefined
  })) as Page[];
  return response[0];
};

//get footer again
export const getFooter = async (): Promise<Footerschema> => {
  try {
    const response = (await getEntry({
      contentTypeUid: "footer_aryan",
      referenceFieldPath: undefined,
      jsonRtePath: undefined,
    })) as any[];

    if (!response || response.length === 0) {
      console.error("Empty or invalid footer data response:", response);
      throw new Error("Footer data is empty");
    }

    const data = response[0][0]; // Adjust based on API response structure
    console.log("Footer Data from backend:", data);
    return {
      navigation: Array.isArray(data.navigation.link) ? data.navigation.link : [],
      social: Array.isArray(data.social.social_share) ? data.social.social_share : [],
      logo: data.logo || "",
      copyright: data.copyright || "",
    };
  } catch (error) {
    console.error("Error fetching footer data:", error);
    throw error; // Throw the error so it can be handled in the component
  }
};
