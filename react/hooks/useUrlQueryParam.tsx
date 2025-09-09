import identity from "lodash/identity";
import pickBy from "lodash/pickBy";
import { useCallback, useMemo } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";

/**
 * keys 返回页面 url 中，指定键的参数值, 不传会获取所有 params
 */

export const useUrlQueryParam = <K extends string>(keys?: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const params = useMemo(
    () =>
      (keys || Array.from(searchParams.keys())).reduce((prev, key) => {
        return { ...prev, [key]: searchParams.get(key) || "" };
      }, {}),
    [searchParams]
  ) as { [key in K]: string };

  /**
   * 更改 url 中的参数
   * @param params
   * @param changeAll 是否更改所有的 params，true 则替换当前所有的 params, 默认 false
   */
  const setParams = useCallback(
    (params: Partial<{ [key in K]: unknown }>, changeAll = false) => {
      const o = pickBy(
        {
          ...(changeAll ? {} : Object.fromEntries(searchParams)),
          ...params,
        },
        identity // 过滤所有值为假的的键值对
      ) as URLSearchParamsInit;
      setSearchParams(o);
    },
    [searchParams, setSearchParams]
  );

  return {
    params,
    setParams,
  };
};

// const { params, setParams } = useUrlQueryParam(["tab"]);
// setParams(
//   {
//     tab: "account",
//   },
//   true
// );
