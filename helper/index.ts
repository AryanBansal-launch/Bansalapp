// import { addEditableTags } from "@contentstack/utils";
import { Page } from "../typescript/pages";
import getConfig from "next/config";
import { FooterProps,HeaderProps} from "../typescript/layout";
import { getEntry, getEntryById, getEntryByUrl } from "../contentstack-sdk";
import { Header } from "next/dist/lib/load-custom-routes";
import { unstable_cache as cache } from "next/cache";

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
  link: {href:string};
  icon: {url:string};
}

export interface FooterSchema {
  navigation: NavigationLink[];
  social: SocialLink[];
  logo: { url: string };
  copyright?: string;
}

//For getting navbar data
export const getHeaderRes = async (): Promise<HeaderProps> => {
  const response = (await getEntry({
    contentTypeUid: "aryan_navbar",
    referenceFieldPath: ["navigation_menu.page_reference"],
    jsonRtePath: undefined,
  })) as HeaderProps[][];

  return response[0][0];
};

//Also for getting navbar data
export const getNavbar=async():Promise<HeaderProps> => {
  const response = (await getEntryByUrl({
    contentTypeUid: "aryan_navbar",
    entryUrl: "/",
    referenceFieldPath: ["navigation_menu.page_reference"],
    jsonRtePath: undefined,
  })) as HeaderProps[][];
  return response[0][0];
}


//for getting footer data
export const getFooterRes = async (): Promise<FooterProps> => {
  const response = (await getEntry({
    contentTypeUid: "footer_aryan",
    referenceFieldPath: undefined,
    jsonRtePath: undefined,
  })) as FooterProps[][];
  return response[0][0];
};

//for getting all pages of specific content type
export const getAllEntries = async (): Promise<Page[]> => {
  const response = (await getEntry({
    contentTypeUid: "common_page",
    referenceFieldPath: undefined,
    jsonRtePath: undefined,
  })) as Page[][];
  return response[0];
};

//for geting any single page by the content type
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

// export const getSkillsRes = async (entryUrl: string): Promise<Page> => {
//   const response = (await getEntryByUrl({
//     contentTypeUid: "common_page",
//     entryUrl: "/skills",
//     referenceFieldPath: undefined,
//     jsonRtePath: undefined,
//   })) as Page[];

//   return response[0];
// };

// export const getSkillsRes = cache(
//   async (entryUrl: string) => {
//     const response = await getEntryByUrl({
//       contentTypeUid: "common_page",
//       entryUrl: "/skills",
//       referenceFieldPath: undefined,
//       jsonRtePath: undefined,
//     }) as Page[];

//     return response[0];
//   },
//   ["skills-data"], // Cache key
//   { revalidate: 10 } // ISR every 10 seconds
// );

// interface Skill {
//   skill_name: string;
//   level: string;
//   logo: { url: string };
// }

export const getSkillsRes = async (): Promise<Page> => {
  const response = await fetch(
    `https://cdn.contentstack.io/v3/content_types/common_page/entries/bltbd861b1a14f9288e`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "api_key": process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY as string,
        "access_token": process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN as string,
      }, 
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch skills data: ${response.statusText}`);
  }

  const data = await response.json();
  // console.log("Skills Data from backend:", data);
  return data.entry;
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

//for getting All Projects page
export const getProjectsRes = async (entryUrl: string): Promise<any> => {
  const response = await getEntryByUrl({
    contentTypeUid: "common_page",
    entryUrl: entryUrl,
    referenceFieldPath: undefined,
    jsonRtePath: undefined,
  });

  const data = (response as any[])[0]; 
  // console.log("projects Data from backend:", data);
  return data.page_components[0].project.projects.map((project: any) => ({
    project_title: project.project_title,
    project_description: project.project_description,
    project_thumbnail: project.project_thumbnail.url,
    links: {
      code_link: {
        title: project.links.code_link.title,
        href: project.links.code_link.href,
      },
      deployed_project_link: {
        title: project.links.deployed_project_link.title,
        href: project.links.deployed_project_link.href,
      },
      detail: {
        href: project.links.detail.href,
      },
    },
  }));
};


//get footer again
export const getFooter = async (): Promise<FooterSchema> => {
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
      logo: data.logo || { url: "" },
      copyright: data.copyright || "",
    };
  } catch (error) {
    console.error("Error fetching footer data:", error);
    throw error; 
  }
};

//getting the contact page
export const getconatctRes = async (entryUrl: string): Promise<Page> => {
  const response = (await getEntryByUrl({
    contentTypeUid: "common_page",
    entryUrl:"/contact",
    referenceFieldPath: undefined,
    jsonRtePath: undefined
  })) as Page[];
  return response[0];
};

//getting the home page banner
export const gethomeRes = async (entryUrl: string): Promise<Page> => {
  const response = (await getEntryByUrl({
    contentTypeUid: "common_page",
    entryUrl:"/",
    referenceFieldPath: undefined,
    jsonRtePath: undefined
  })) as Page[];
  return response[0];
};

//getting the project detail for a specific project
export const getProjectDetail = async (entryUrl: string): Promise<any> => {
  const response = (await getEntryByUrl({
    contentTypeUid: "project_detail",
    entryUrl:entryUrl,
    referenceFieldPath: undefined,
    jsonRtePath: undefined
  })) as Page[];
  return response[0];
};