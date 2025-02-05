export const PRINCIPAL_QUERY =
  "SELECT * FROM jos_estateagent order by created DESC";
export const PRINCIPAL_QUERY_IMAGES =
  "SELECT * FROM jos_estateagent_images WHERE objid = ?";

// ClEAR OLD REGISTRIES (NOT RUN FOR FIRST TIME)
//UPDATE wp249_posts SET post_status = 'trash' WHERE post_type = 'rem_property' or post_type = 'post' AND ID >= 32473;

// CHANGE POST FOR PROPERTY
//UPDATE wp249_posts SET post_type = 'rem_property' WHERE post_type = 'post' AND (post_status = 'publish' OR post_status = 'draft') AND ID >= 109215;

// SET IMAGES
//UPDATE wp249_postmeta SET meta_value = SUBSTRING(meta_value, 2) WHERE post_id > 96142 AND post_id <= 102779 AND meta_key = 'rem_property_images';


//// UPDATE CATEGORIES
//// Alquiler
// UPDATE wp249_term_relationships SET term_taxonomy_id = 12 WHERE term_taxonomy_id = 20 and object_id >= 98099; 

//// Apartamentos
// UPDATE wp249_term_relationships SET term_taxonomy_id = 6 WHERE term_taxonomy_id = 21 and object_id >= 98099; 

//// Casas
// UPDATE wp249_term_relationships SET term_taxonomy_id = 7 WHERE term_taxonomy_id = 22 and object_id >= 98099; 

//// Chacra / Campo
// UPDATE wp249_term_relationships SET term_taxonomy_id = 11 WHERE term_taxonomy_id = 23 and object_id >= 98099; 

//// Hoteles
// UPDATE wp249_term_relationships SET term_taxonomy_id = 9 WHERE term_taxonomy_id = 24 and object_id >= 98099; 

//// Locales
// UPDATE wp249_term_relationships SET term_taxonomy_id = 8 WHERE term_taxonomy_id = 25 and object_id >= 98099; 

//// Terrenos
// UPDATE wp249_term_relationships SET term_taxonomy_id = 10 WHERE term_taxonomy_id = 26 and object_id >= 98099; 

////Venta
// UPDATE wp249_term_relationships SET term_taxonomy_id = 13 WHERE term_taxonomy_id = 27 and object_id >= 98099; 



// Set thumbnail
// INSERT INTO wp249_postmeta (post_id, meta_key, meta_value)
// SELECT post_id, '_thumbnail_id' as meta_key, SUBSTRING(meta_value, POSITION("{i:" IN meta_value) + 3, POSITION(";" IN meta_value) - (POSITION("{i:" IN meta_value) + 3)) as meta_value
// FROM wp249_postmeta WHERE meta_key = 'rem_property_images' AND meta_value <> '' AND meta_value NOT LIKE '%i:;%' AND meta_value <> 'a:0:{}' AND meta_value NOT LIKE '%object Promise%';

