import * as Utils from "@contentstack/utils";
import ContentstackLivePreview from "@contentstack/live-preview-utils";
// import getConfig from "next/config";
import {
  customHostUrl,
  initializeContentStackSdk,
  isValidCustomHostUrl,
} from "./utils";

type GetEntry = {
  contentTypeUid: string;
  referenceFieldPath: string[] | undefined;
  jsonRtePath: string[] | undefined;
};

type GetEntryById = {
  contentTypeUid: string;
  entryId: string;
  referenceFieldPath: string[] | undefined;
  jsonRtePath: string[] | undefined;
};

type GetEntryByUrl = {
  entryUrl: string | undefined;
  contentTypeUid: string;
  referenceFieldPath: string[] | undefined;
  jsonRtePath: string[] | undefined;
};

// const envConfig = process.env;
const {
  NEXT_PUBLIC_CONTENTSTACK_API_KEY,
  NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN,
  NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT,
  NEXT_PUBLIC_CONTENTSTACK_BRANCH,
  NEXT_PUBLIC_CONTENTSTACK_REGION,
  NEXT_PUBLIC_CONTENTSTACK_PREVIEW_TOKEN,
  NEXT_PUBLIC_CONTENTSTACK_PREVIEW_HOST,
  NEXT_PUBLIC_CONTENTSTACK_APP_HOST,
  NEXT_PUBLIC_CONTENTSTACK_LIVE_PREVIEW,
} = process.env;


let customHostBaseUrl = process.env.NEXT_APP_CONTENTSTACK_API_HOST as string;

customHostBaseUrl = customHostBaseUrl? customHostUrl(customHostBaseUrl): '';

// SDK initialization
const Stack = initializeContentStackSdk();

// set host url only for custom host or non prod base url's
if (!!customHostBaseUrl && isValidCustomHostUrl(customHostBaseUrl)) {
  Stack.setHost(customHostBaseUrl);
}

// Setting LP if enabled
ContentstackLivePreview.init({
  //@ts-ignore
  stackSdk: Stack,
  clientUrlParams:{
    host: process.env.NEXT_APP_CONTENTSTACK_APP_HOST as string,
  },
  ssr:false,
})?.catch((err) => {
  if (process.env.NODE_ENV === 'development') {
    console.warn('Contentstack Live Preview failed to initialize:', err.message);
  }
});

export const { onEntryChange } = ContentstackLivePreview;

const renderOption = {
  span: (node: any, next: any) => next(node.children),
};

/**
 *
 * fetches all the entries from specific content-type
 * @param {* content-type uid} contentTypeUid
 * @param {* reference field name} referenceFieldPath
 * @param {* Json RTE path} jsonRtePath
 *
 */

//GET ANY ENTRY
export const getEntry = ({
  contentTypeUid,
  referenceFieldPath,
  jsonRtePath,
}: GetEntry) => {
  return new Promise((resolve, reject) => {
    const query = Stack.ContentType(contentTypeUid).Query();
    console.log("query", query);
    if (referenceFieldPath) query.includeReference(referenceFieldPath);
    // console.log(query.toJSON().find());
    query
      .toJSON()
      .find()
      .then(
        (result) => {
          jsonRtePath &&
            Utils.jsonToHTML({
              entry: result,
              paths: jsonRtePath,
              renderOption,
            });
          resolve(result);
        },
        (error) => {
          reject(error);
        }
      );
  });
};

//GET ENTRY BY ID
export const getEntryById = ({
  contentTypeUid,
  entryId,
  referenceFieldPath,
  jsonRtePath,
}: GetEntryById): Promise<any> => {
  return new Promise((resolve, reject) => {
    const query = Stack.ContentType(contentTypeUid).Entry(entryId).toJSON();

    if (referenceFieldPath) {
      query.includeReference(referenceFieldPath);
    }

    query
      .fetch()
      .then((result) => {
        if (jsonRtePath) {
          Utils.jsonToHTML({
            entry: result,
            paths: jsonRtePath,
            renderOption,
          });
        }
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 *fetches specific entry from a content-type
 *
 * @param {* content-type uid} contentTypeUid
 * @param {* url for entry to be fetched} entryUrl
 * @param {* reference field name} referenceFieldPath
 * @param {* Json RTE path} jsonRtePath
 * @returns
 */


 //GET EBTRY BY URL
export const getEntryByUrl = ({
  contentTypeUid,
  entryUrl,
  referenceFieldPath,
  jsonRtePath,
}: GetEntryByUrl) => {
  return new Promise((resolve, reject) => {
    const blogQuery = Stack.ContentType(contentTypeUid).Query();
    if (referenceFieldPath) blogQuery.includeReference(referenceFieldPath);
    blogQuery.toJSON();
    const data = blogQuery.where("url", `${entryUrl}`).find();
    data.then(
      (result) => {
        jsonRtePath &&
          Utils.jsonToHTML({
            entry: result,
            paths: jsonRtePath,
            renderOption,
          });
        resolve(result[0]);
      },
      (error) => {
        console.error(error);
        reject(error);
      }
    );
  });
};