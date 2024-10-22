import {
  customersSelect,
  employeesSelect,
  menuSelect,
  restaurantsSelect,
} from "../data";
import restaurantRepo, { type customerOrders } from "./repo/restaurant.repo";
import logger from "../logger";
import { createOrderType } from "../app";
import { kafkaClient } from "../kafka/client";
import featureToggleclient from "../feature-toggle/client";

class RestaurantService {
  private TOPIC = "rest-api";
  private ENABLED_TOGGLE = "use-kafka-flag";

  constructor() {
    kafkaClient.consumeMessage(this.TOPIC, (message) => {
      if (message) {
        const event = JSON.parse(message);
        if (event.type === "customer orders created")
          console.log("customer orders created", event.payload);
      }
    });
  }
  async getCustomers(): Promise<customersSelect[]> {
    return await restaurantRepo.getCustomers();
  }
  async getEmployees(): Promise<employeesSelect[]> {
    return await restaurantRepo.getEmployees();
  }
  async getMenu(): Promise<menuSelect[]> {
    return await restaurantRepo.getMenu();
  }
  async getRestaurants(): Promise<restaurantsSelect[]> {
    return await restaurantRepo.getRestaurants();
  }
  async getOrdersFromAllCustomers(
    limit: number,
    offset: number
  ): Promise<
    | {
        customerName: string;
        menu: string[];
      }[]
    | null
  > {
    try {
      const rawResponse = await restaurantRepo.getOrdersFromAllCustomers(
        limit,
        offset
      );

      // sorting the array of objects by customerName so, same name will be grped tgt. no need as i GROUP BY in
      //rawResponse.sort((a, b) => a.customerName.localeCompare(b.customerName));
      console.log("RAW REPONSE");
      console.log(rawResponse);

      // no customer with same name lolll
      const customerNames: Set<string> = new Set<string>();
      let customerObject: { customerName: string; menu: string[] } | null = {
        customerName: "",
        menu: [],
      };
      const finalList: { customerName: string; menu: string[] }[] = [];
      for (let response of rawResponse) {
        if (customerNames.has(response.customerName)) {
          customerObject.menu.push(response.menuName);
        } else {
          // cleaning up the object before being restarted
          customerObject = null;
          // adding the new name to a set
          customerNames.add(response.customerName);
          customerObject = {
            customerName: response.customerName,
            menu: [response.menuName],
          };
          finalList.push(customerObject);
        }
      }

      return finalList;
    } catch (e) {
      logger.error("An error occurred", {
        error: (e as Error).message,
        stack: (e as Error).stack,
      });
      return null;
    }
  }

  async getOrdersFromCustomer(customerId: number) {
    try {
      const rawResponse = await restaurantRepo.getOrdersFromCustomer(
        customerId
      );

      const arrToSend: string[] = [];
      if (rawResponse !== 0) {
        if (rawResponse.length === 0) {
          return undefined;
        }
        for (let response of rawResponse) {
          arrToSend.push(response.menuName);
        }

        return arrToSend;
      }
      return 0;
    } catch (e) {
      // in ts strict mode, error's type is unknown
      logger.error("An error occurred", {
        error: (e as Error).message,
        stack: (e as Error).stack,
      });
      return null;
    }
  }

  async getCustomerById(customerId: number): Promise<customersSelect | null> {
    const queryRs = await restaurantRepo.getCustomerById(customerId);
    if (queryRs.length !== 0) return queryRs[0];
    return null;
  }

  async createRestaurant(
    restaurant: restaurantsSelect
  ): Promise<restaurantsSelect[] | number | null> {
    try {
      return await restaurantRepo.createRestaurant(restaurant);
    } catch (e) {
      // in ts strict mode, error's type is unknown
      logger.error("An error occurred", {
        error: (e as Error).message,
        stack: (e as Error).stack,
      });
      return null;
    }
  }

  async createEmployee(
    newEmployee: employeesSelect
  ): Promise<employeesSelect | null | unknown> {
    const { restaurantId } = newEmployee;

    let queryRs: employeesSelect[] | null;
    try {
      queryRs = await restaurantRepo.createNewEmployee(
        newEmployee,
        restaurantId
      );
    } catch (e) {
      return e;
    }

    return queryRs ? queryRs[0] : null;
  }

  async createOrders(inboundOrder: createOrderType) {
    const toggleClient = await featureToggleclient;
    try {
      const result = await restaurantRepo.createNewOrder(inboundOrder);
      console.log(result);
      const event = {
        type: "customer orders created",
        payload: inboundOrder,
      };
      if (toggleClient.isEnabled(this.ENABLED_TOGGLE))
        await kafkaClient.sendMessage(this.TOPIC, JSON.stringify(event));
      return result;
    } catch (e) {
      logger.error("An error occurred", {
        error: (e as Error).message,
        stack: (e as Error).stack,
      });
      return null;
    }
  }

  async createCustomer(name: string): Promise<customersSelect | null> {
    let queryRs: customersSelect[];
    try {
      queryRs = await restaurantRepo.createCustomer(name);
      return queryRs[0];
    } catch (e) {
      // in ts strict mode, error's type is unknown
      logger.error("An error occurred", {
        error: (e as Error).message,
        stack: (e as Error).stack,
      });
      return null;
    }
  }
  async updateRestaurant(
    updateRestaurant: restaurantsSelect,
    id: number
  ): Promise<restaurantsSelect | null | unknown> {
    let queryRs: restaurantsSelect[];
    try {
      queryRs = await restaurantRepo.updateRestaurant(updateRestaurant, id);
    } catch (e) {
      logger.error("An error occurred", {
        error: (e as Error).message,
        stack: (e as Error).stack,
      });
      return null;
    }
    return queryRs.length !== 0 ? queryRs[0] : null;
  }

  async deleteRestaurant(
    id: number
  ): Promise<restaurantsSelect | unknown | null> {
    let queryRs: restaurantsSelect[];
    try {
      queryRs = await restaurantRepo.deleteRestaurant(id);
    } catch (e) {
      logger.error("An error occurred", {
        error: (e as Error).message,
        stack: (e as Error).stack,
      });
      return null;
    }
    return queryRs.length !== 0 ? queryRs[0] : null;
  }
}

const restaurantService = new RestaurantService();
export default restaurantService;
