import React, { useEffect, useMemo, useState } from "react";
import { Box, Header as GrommetHeader, Spinner } from "grommet";
import { ReactComponent as LogoIcon } from "../../../assets/images/logo.svg";
import { ReactComponent as MenuIcon } from "../../../assets/images/menu.svg";
import { useQuery } from "react-query";
import { api, User, UserResponse } from "../../../api";

export const Header = () => {
  const { isLoading, error, data } = useQuery("user", api.user.getUser);
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    if (data?.data?.length && data?.data.length > 0) {
      setUser(data?.data[0]);
    }
  }, [data]);

  const initials = useMemo(
    () =>
      user ? `${user?.firstName.charAt(0)}${user?.lastName.charAt(0)}` : "",
    [user]
  );

  return (
    <GrommetHeader
      pad="medium"
      border={{
        size: "2px",
        color: "dark-4",
        style: "solid",
        side: "bottom",
      }}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Box direction="row" align="center" gap="medium">
            <LogoIcon />
            <MenuIcon />
          </Box>
          <Box direction="row" align="center" gap="medium">
            <Box background="accent-2" pad="small" round={{ size: "5px" }}>
              {initials}
            </Box>
            <label>
              {user?.firstName} {user?.lastName}
            </label>
          </Box>
        </>
      )}
    </GrommetHeader>
  );
};
