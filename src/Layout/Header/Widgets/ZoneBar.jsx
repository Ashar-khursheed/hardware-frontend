import React, { useEffect, useRef, useState, useCallback, useContext } from "react";
import { Button, Input, ListGroup, ListGroupItem, ModalBody, ModalHeader } from "reactstrap";
import request from "@/Utils/AxiosUtils";
import { ZonePointsApi } from "@/Utils/AxiosUtils/API";
import { useRouter } from "next/navigation";
import { RiCloseLine, RiCrosshair2Line, RiFocus3Line, RiMapPinLine } from "react-icons/ri";
import Btn from "@/Elements/Buttons/Btn";
import { useTranslation } from "react-i18next";
import CartContext from "@/Context/CartContext";
import ZoneContext from "@/Context/ZoneContext";
import CustomModal from "@/Components/Widgets/CustomModal";

const ZoneBar = () => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const { clearCart } = useContext(CartContext);
  const [selectedZone, setSelectedZone] = useState(localStorage.getItem("selectedZone") || "");
  const autocompleteServiceRef = useRef(null);
  const [modal, setModal] = useState(false);
  const { zones, setZones, setIsZoneSelected, isZoneSelected } = useContext(ZoneContext);
  const [show, setShow] = useState(false);
  const showToggle = () => {
    setShow(!show);
  };
  const router = useRouter();
  const { t } = useTranslation("common");

  useEffect(() => {
    localStorage.getItem("selectedZone");
    if (selectedZone) {
      setIsZoneSelected(true);
    } else {
      setIsZoneSelected(false);
    }
  }, []);

  // Load Google Maps API and initialize AutocompleteService
  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const existingScript = document.getElementById("google-map-script");
      if (!existingScript) {
        const script = document.createElement("script");
        script.src = "https://maps.googleapis.com/maps/api/js?key=your_api_key&libraries=places,geometry";
        script.id = "google-map-script";
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        script.onload = initializeAutocompleteService;
      } else {
        initializeAutocompleteService();
      }
    };

    const initializeAutocompleteService = () => {
      if (window.google) {
        autocompleteServiceRef.current = new window.google.maps.places.AutocompleteService();
      }
    };

    loadGoogleMapsScript();
  }, []);

  // Handle input change and fetch suggestions
  const handleInputChange = useCallback((e) => {
    const value = e.target.value;
    setSearch(value);

    if (value && autocompleteServiceRef.current) {
      autocompleteServiceRef.current.getPlacePredictions({ input: value }, (predictions) => {
        if (predictions) {
          setSuggestions(predictions);
        } else {
          setSuggestions([]);
        }
      });
    } else {
      setSuggestions([]);
    }
  }, []);

  // Fetch zone coordinates and call API
  const fetchZoneCoordinates = useCallback(
    async (zoneName) => {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: zoneName }, async (results, status) => {
        if (status === "OK" && results?.[0]?.geometry) {
          const lat = results[0].geometry.location.lat();
          const lng = results[0].geometry.location.lng();

          try {
            const response = await request({ url: `${ZonePointsApi}?lat=${lat}&lng=${lng}` }, router);
            const zoneIds = response?.data?.map((zone) => zone.id) || [];
            setZones(zoneIds);
            setIsZoneSelected(true);
            setModal(false);
            localStorage.setItem("zones", JSON.stringify(zoneIds));
          } catch (error) {
            console.error("Error fetching zone points:", error);
            setZones([]);
            setIsZoneSelected(false);
            localStorage.removeItem("zones");
          }
        } else {
          console.error("Geocoding failed: ", status);
        }
      });
    },
    [router, setZones]
  );

  // Handle suggestion click
  const handleSuggestionClick = useCallback(
    (suggestion) => {
      setSearch(suggestion.description); // Clear the input
      setSuggestions([]); // Clear suggestions
      setSelectedZone(suggestion.description); // Set selected zone
      localStorage.setItem("selectedZone", suggestion.description);
      fetchZoneCoordinates(suggestion.description);
    },
    [fetchZoneCoordinates]
  );

  // Handle fetching the user's current location
  const handleCurrentLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({ location: { lat, lng } }, (results, status) => {
            if (status === "OK" && results?.[0]) {
              const address = results[0].formatted_address;
              setSearch(address); // Show the current location in the search bar
              setSelectedZone(address);
              localStorage.setItem("selectedZone", address);
              clearCart();
              fetchZoneCoordinates(address); // Fetch zones for the current location
              // Close both modal and main box
              setShow(false);
              setModal(false);
            } else {
              console.error("Geocoding failed: ", status);
            }
          });
        },
        (error) => {
          console.error("Error getting current location:", error);
          alert("Unable to fetch your current location. Please try again.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }, [fetchZoneCoordinates]);

  //clear zone
  const clearZone = () => {
    setIsZoneSelected(false);
    setSearch("");
    setSelectedZone("");
    setZones([]);
    localStorage.removeItem("selectedZone");
  };

  return (
    <li className={`right-nav-list location-dropdown ${show || !isZoneSelected ? "show" : ""}`}>
      <Btn
        className="location-button"
        color="transparent"
        onClick={() => {
          showToggle();
        }}
      >
        <RiMapPinLine />
        {t("location")}
      </Btn>
      <CustomModal
        modal={modal}
        setModal={setModal}
        classes={{
          modalClass: "theme-modal location-modal modal-dialog modal-dialog-centered",
          customChildren: true,
        }}
      >
        <ModalHeader>
          <div>
            <h5 className="modal-title w-100">{t("choose_your_location")}</h5>
            <p className="text-content fw-normal">{t("enter_your_address_and_we_will_specify_the_offer_for_your_area")}</p>
          </div>
          <Btn type="button" className="btn-close" onClick={() => setModal(false)}>
            <div>
              <i className="ri-close-line"></i>
            </div>
          </Btn>
        </ModalHeader>
        <ModalBody>
          <div className="search-box">
            <div className="search-input-button">
              <button className="clear-btn btn" onClick={clearZone}>
                <RiCloseLine />
              </button>
              <Input type="text" placeholder={t("search_for_a_zone")} value={search} onChange={handleInputChange} className="search-input" />
            </div>
          </div>
          <Button color="transparent" className="btn btn-2 btn-2-animation location-btn" onClick={handleCurrentLocation}>
            <RiCrosshair2Line /> {t("use_current_location")}
          </Button>

          {/* Suggestions List */}
          {suggestions.length > 0 && (
            <ul className="search-list-box theme-dropdown">
              {suggestions.map((suggestion, index) => (
                <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                  <RiMapPinLine />
                  {suggestion.description}
                </li>
              ))}
            </ul>
          )}
        </ModalBody>
      </CustomModal>
      <div className="location-main-box">
        <div className="current-location-box">
          <div className="location-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" color="currentColor">
                <path d="M14.5 9a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0" />
                <path d="M13.257 17.494a1.813 1.813 0 0 1-2.514 0c-3.089-2.993-7.228-6.336-5.21-11.19C6.626 3.679 9.246 2 12 2s5.375 1.68 6.467 4.304c2.016 4.847-2.113 8.207-5.21 11.19M18 20c0 1.105-2.686 2-6 2s-6-.895-6-2" />
              </g>
            </svg>
            <h5>{selectedZone?.length > 0 ? selectedZone : t("we_need_your_location_to_enhance_your_experience")}</h5>
          </div>
          <div className="location-btn-group">
            <Button color="transparent" className="btn btn-2 btn-2-animation bg-theme" onClick={handleCurrentLocation}>
              <RiFocus3Line />
              {t("use_current_location")}
            </Button>
            <h6>
              <span>OR</span>
            </h6>
            <Button color="transparent" className="btn btn-theme-outline" onClick={() => setModal(true)}>
              {t("select_manually")}
            </Button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ZoneBar;
