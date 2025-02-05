import { Agent, fetch } from "undici";

import {
  METHOD_WP,
  OPTIONS_NUMBER,
  OPTIONS_STATUS,
  OPTIONS_STRING,
  PROPERTIES_CATEGORIES,
  PROPERTIES_CATEGORIES_DATABASE,
  PROPERTIES_CURRENCIES,
  PROPERTIES_TYPE,
  TYPE,
} from "../utils/constants.js";
import { POOL_CONFIG } from "../utils/clients.js";

const agent = new Agent(POOL_CONFIG);

export const createPost = async (property, remImages) => {
  const postHeaders = new Headers();
  postHeaders.set("Content-Type", "application/json");
  postHeaders.set("Authorization", `Basic ${process.env.AUTH_TOKEN}`);

  const response = await fetch(
    `${process.env.WORDPRESS_URL}/${process.env.WORDPRESS_POST_API}`,
    {
      method: METHOD_WP,
      headers: postHeaders,
      body: JSON.stringify({
        title: property.title,
        content: property.description,
        status: OPTIONS_STATUS[property.published],
        type: TYPE,
        meta: {
          rem_id_vivienda: property.id,
          rem_id_object: property.obj_id,
          rem_property_bedrooms: property.bedrooms,
          rem_property_bathrooms: property.wc,
          rem_title: property.title,
          rem_description: property.description,
          rem_space: Number(property.space),
          rem_property_area: Number(property.space),
          rem_property_price: property.price,
          rem_property_city: property.district,
          rem_property_state_iso: property.town,
          rem_property_town: property.town,
          rem_property_country_iso:
            property.country == "UY" ? "Uruguay" : property.country,
          rem_name_owner: property.name_owner,
          rem_telephone_owner: property.telephone_owner,
          rem_real_street_owner: property.real_street_owner,
          rem_padron_owner: property.padron_owner,
          rem_contribution_owner: property.contribution_owner,
          rem_cellphone_owner: property.cellphone_owner,
          rem_description_owner: property.description_owner,
          rem_street_owner: property.street_owner,
          rem_pp_size: Number(property.pp_size),
          rem_perimeter_fence: OPTIONS_NUMBER[property.perimeter_fence],
          rem_irrigation_system: OPTIONS_NUMBER[property.irrigation_system],
          rem_parrillero: OPTIONS_NUMBER[property.parrillero],
          rem_alarm: OPTIONS_NUMBER[property.alarm],
          rem_status: property.status,
          rem_barbecue: OPTIONS_NUMBER[property.barbecue],
          rem_park: OPTIONS_NUMBER[property.park],
          rem_laundry: OPTIONS_NUMBER[property.laundry],
          rem_deposit: OPTIONS_NUMBER[property.deposit],
          rem_garage: OPTIONS_NUMBER[property.garage],
          rem_parkarea: OPTIONS_NUMBER[property.parkarea],
          rem_terrace: OPTIONS_NUMBER[property.terrace],
          rem_balcony: OPTIONS_NUMBER[property.balcony],
          rem_swpool: OPTIONS_NUMBER[property.swpool],
          rem_dsl: OPTIONS_NUMBER[property.dsl],
          rem_fireside: OPTIONS_NUMBER[property.fireside],
          rem_toheat: property.toheat,
          rem_aircondition: OPTIONS_NUMBER[property.aircondition],
          rem_lift: OPTIONS_NUMBER[property.lift],
          rem_property_purpose: PROPERTIES_TYPE[property.type],
          rem_property_type: PROPERTIES_CATEGORIES[property.cat],
          rem_front_size: property.front_size,
          rem_level_to_street: property.level_to_street,
          rem_orientation: property.orientation,
          rem_reapir_fittolive: property.reapir_fittolive,
          rem_forest: property.forest,
          rem_property_images:
            remImages.length > 0 ? `a${remImages}` : OPTIONS_STRING.NO, // Add 'a' to remove later (unicode/format)
          rem_water_running: OPTIONS_NUMBER[property.water_running],
          rem_light: OPTIONS_NUMBER[property.light],
          rem_gas_for_tubing: OPTIONS_NUMBER[property.gas_for_tubing],
          rem_sanitation: OPTIONS_NUMBER[property.sanitation],
          rem_telephone_on_zone: OPTIONS_NUMBER[property.telephone_on_zone],
          rem_cabletv_on_zone: OPTIONS_NUMBER[property.cabletv_on_zone],
          rem_rent: OPTIONS_NUMBER[property.rent],
          rem_rent_extra: OPTIONS_NUMBER[property.rent_extra],
          rem_currency_code: PROPERTIES_CURRENCIES[property.currency_code],
          rem_commis: property.commis,
          rem_secure: OPTIONS_NUMBER[property.secure],
          rem_receipts: OPTIONS_NUMBER[property.receipts],
          rem_garden: OPTIONS_NUMBER[property.garden],
          rem_car_roof: OPTIONS_NUMBER[property.car_roof],
          rem_backyard: OPTIONS_NUMBER[property.backyard],
          rem_services: OPTIONS_NUMBER[property.services],
          rem_street: property.street,
          rem_streetnr: property.streetnr,
          rem_pcode: property.pcode,
          rem_location: property.location,
          rem_condition: property.condition,
          rem_other: property.other,
          rem_position: property.position,
          rem_yobuilt: property.yobuilt,
        },
        categories: [PROPERTIES_CATEGORIES_DATABASE[property.cat]],
      }),
      dispatcher: agent,
    }
  );

  const data = await response.json();
  return data.id;
};
