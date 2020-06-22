import React, { useState } from 'react';

const Navbar = (props) => {

  return (
    <div className="navbar-fixed">
      <nav>
        <div className="nav-wrapper dark-grey text-center">
          <img className="logo-image"
          src="https://agora-file-storage-prod.s3.us-west-1.amazonaws.com/workplace/attachment/1409593262068993721?response-content-disposition=inline%3B%20filename%3D%22Mindhive%2520Banner%2520Text%2520-%2520WHITE.png%22%3B%20filename%2A%3Dutf-8%27%27Mindhive%2520Banner%2520Text%2520-%2520WHITE.png&amp;X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMSJHMEUCICVhjXK6B6nz8E5RzaCCodZw3US5Ly19waZmd75TdtW9AiEA1JhG7stF2RUWiYGkwl3E0gsAXQB0O88assX9BReQq9EqkAQIVBAAGgw3Mzk5MzkxNzM4MTkiDEPAI9zkwxRKW64%2BBCrtA7%2BA%2FpE3Qyj8edntdQ%2BBRuxPN7qF9yBw%2Bp%2F8XNz%2FVsxcNLgORo2bnd3r0iuerVzd8cIcnRwg%2BBLrsRfzKYmtIT33rv9Bi6mFy1jk8A5JTpjfksqdVawasVVSLIJOn3gYfFLSlJEmdNY13zzj2S2TfXfgLflSpi11VmI%2FdUwA%2BT1jonZfXPUoJaZd8Uz9WTuDsAfnJaZ5xi1UQ7fsAnPd74DkYFOR3mk2Vz23nphLH1Fg%2BrVRNpCXQGPO%2F%2FejSz7dUFruM6jYpm7yrb3pg0O6wCRdUmMuLYEjG4g9tQDjgdGHSDingosZbduh%2BzshrUhteP8BXxEArNsdP1u6q710tXzBchYOlHmAyabUf5J1bPf4Kw7wu5vXk2SIXELP878cwgHLqAhwrjQaSfJgG9ADgkSi1HZqRkbVAOw9G11dkBkSt7i9xSarCzjyM%2BAOI5ezpYk%2BEfXKRfxL%2FFOOtM9z%2BXNoFAEFOB4XYaomsOAZaKughDFBFogbJ9sxarJEgVsqvJr90m%2FA1YN5p75SUWOPWtB%2Bfn4UpEqVbu3zi9a6J44fbd0bNUgUkdtWZBOWH8llUNYaLerag4jcJrDffUKWyy9j5PPhrxYcA%2BOaFNDxyu6yYF8V4H5MdzoDonRSuRD2%2FmUgmTZwY25%2BR%2Fsa4M0wwsjA9wU67wFGje%2FHQVUdz8rQYurzN5Cf425CJftLgImEDxUxyWUKYEtZeJvxYQ3clSznzlGHICFjwhZIapfGcoV3OeYMfFRZ4NMNJTBoZyUAFz%2FS7sooKvw2pdeGmhe%2BcvsFHBg5m%2BsN%2B7jA1m%2BZwgtYyb%2FTTMalect0%2B1Ugu7FZj1aPuarIwY6OUiFemOzBmeRQYtzVVkXvYtidczgvjTKKco1U5VdsfoV6e9be6vIoPMnTuUm6cHL4dcPo%2FS924SA42roTc0oxntORynUHYTOVV%2BIIww9IlzYcJxy2frZU6JBaO%2FOJKr3%2B7g%2BG%2BAscM5aw0XU4Eg%3D%3D&amp;X-Amz-Algorithm=AWS4-HMAC-SHA256&amp;X-Amz-Date=20200622T050923Z&amp;X-Amz-SignedHeaders=host&amp;X-Amz-Expires=599&amp;X-Amz-Credential=ASIA2YR6PYW5YOR24D5H%2F20200622%2Fus-west-1%2Fs3%2Faws4_request&amp;X-Amz-Signature=d025a3348d7397803c021e031303d8e0319117f40fde5329d4d6d11e0299d52a" />
          {/* <ul className="right pointer">
            <li onClick={() => props.changePage('dashboard')}>Dashboard</li>
            <li onClick={() => props.changePage('inputs')}>Inputs</li>
          </ul> */}
        </div>
      </nav>
    </div>
  );

}
export default Navbar;