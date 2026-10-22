export const productsFrenchContent = {
  lang: "fr",
  direction: "ltr",
  routes: {
    landing: "/fr/products",
    list: "/fr/products-list",
    product: (id) => `/fr/product/${id}`
  },
  landing: {
    imageAlt: "Produits technologiques",
    kicker: "Catalogue numérique Almutqaddim",
    title: "Découvrez nos produits",
    description: "Un catalogue numérique moderne pour consulter les caractéristiques techniques et choisir le produit adapté à chaque projet.",
    action: "Parcourir les produits"
  },
  featured: {
    title: "Produits à la une",
    viewAll: "Voir tout",
    loading: "Chargement des produits à la une..."
  },
  errors: {
    connection: "Impossible de se connecter au serveur pour charger les produits. Vérifiez votre connexion Internet et réessayez.",
    server: "Les produits ne peuvent pas être chargés depuis le serveur pour le moment. Veuillez réessayer plus tard.",
    retry: "Réessayer",
    retrying: "Nouvelle tentative..."
  },
  list: {
    title: "Produits",
    pageSummary: ({ currentPage, totalPages, total }) => `Page ${currentPage} sur ${totalPages} — ${total} produits`,
    searchPlaceholder: "Rechercher par nom ou modèle...",
    allCategories: "Toutes les catégories",
    allBrands: "Toutes les marques",
    loading: "Chargement des produits...",
    empty: "Aucun produit ne correspond à votre recherche.",
    pagerLabel: "Pages des produits",
    pageOf: ({ currentPage, totalPages }) => `Page ${currentPage} sur ${totalPages}`,
    previous: "‹",
    previousLabel: "Page précédente",
    next: "Page suivante »"
  },
  card: { details: "Voir les détails", addToCart: "Ajouter au panier", cartFull: "Panier plein (12 produits maximum)" },
  details: {
    loading: "Chargement des détails du produit...",
    notFoundTitle: "Produit introuvable",
    notFound: "Ce produit a peut-être été supprimé ou n’est plus disponible.",
    errorTitle: "Impossible de charger le produit",
    loadError: "Un problème est survenu lors du chargement du produit. Veuillez réessayer.",
    retry: "Réessayer",
    backToProducts: "Retour aux produits",
    model: "Modèle :",
    brand: "Marque :",
    quantity: "Quantité souhaitée",
    decreaseQuantity: "Diminuer la quantité",
    increaseQuantity: "Augmenter la quantité",
    datasheet: (count, index) => `Télécharger la fiche technique ${count > 1 ? index + 1 : ""} (PDF)`,
    features: "Fonctionnalités",
    specifications: "Caractéristiques techniques",
    relatedTitle: "Produits associés",
    relatedSubtitle: "Une sélection de produits susceptibles de vous intéresser"
  }
};
