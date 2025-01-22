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