///////////////////////////////////////////////////////

export interface ILaunch {
  id: string;
  name: string;
  image_url: string;

  rocket: {
    configuration: {
      name: string;
      launch_service_provider: string;
    };
  };
}

export interface ILaunch_details {
  id: string;
  name: string;
  image_url: string;
  slug: string;
  rocket: {
    configuration: {
      name: string;
      description: string;
      family: string;
      full_name: string;
      launch_service_provider: {
        name: string;
        country_code: string;
      };
    };
  };
}

export const routes = {
  launches: "/launches",
};
