import styled from "styled-components"
import { Link } from "react-router-dom"
export const NavigationDiv = styled.div`
  height: 70px;
  width: 90%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`
export const LogoLink = styled(Link)`
  height: 100%;
  width: 70px;
  padding: 25px;
`
export const LinksDiv = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

export const NavigationLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
`