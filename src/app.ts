import express, { Express, Request, Response } from "express";
import restaurantService from "./restaurant/restaurant.service";
import { validateRequestBody } from "zod-express-middleware";
import {
  employeeInsertSchema,
  employeesSelect,
  restaurantsInsertSchema,
  restaurantsSelect,
} from "./data";
import { NextFunction } from "connect";
import logger from "./logger";
import { z } from "zod";

// zod object for order input
const createOrder = z
  .object({
    customerName: z.string(),
    restaurantId: z.number(),
    itemIds: z.array(z.number()),
  })
  .required();

const customerIdSchema = z.object({ customerId: z.number() }).required();

const app: Express = express();
app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  logger.info("Index route accessed");
  res.json("hello from Restaurant API");
});

app.get("/customers", async (req, res) => {
  // async fn will return pending promise as soon as it is revoked
  const restaurantList = await restaurantService.getCustomers();
  res.json(restaurantList);
});
app.get("/employees", async (req, res) => {
  const employeeList = await restaurantService.getEmployees();
  res.json(employeeList);
});
app.get("/menu", async (req, res) => {
  const menuList = await restaurantService.getMenu();
  res.json(menuList);
});
app.get("/restaurants", async (req, res) => {
  const restaurantList = await restaurantService.getRestaurants();
  res.json(restaurantList);
});
// get all orders from everyone
app.get("/orders", async (req, res) => {
  const offSet = req.query.offset as string;
  const limit = req.query.limit as string;
  const customerOrdersList = await restaurantService.getOrdersFromAllCustomers(
    parseInt(limit),
    parseInt(offSet)
  );
  customerOrdersList ? res.json(customerOrdersList) : res.status(500).send();
});

app.get("/order", validateRequestBody(customerIdSchema), async (req, res) => {
  const { customerId } = req.body;
  const customerOrdersList = await restaurantService.getOrdersFromCustomer(
    customerId
  );

  if (customerOrdersList === 0) {
    res.status(418).json("This customer does not exist");
  } else if (customerOrdersList === null) {
    res.status(500).send();
  } else if (customerOrdersList === undefined) {
    res.status(418).json("Customer has not made any order");
  } else {
    res.status(200).json(customerOrdersList);
  }
});

app.get("/customers/:id", async (req, res) => {
  const customer = await restaurantService.getCustomerById(
    parseInt(req.params.id)
  );

  customer
    ? res.json(customer)
    : res.status(404).json("Your resource does not exist");
});

app.post(
  "/restaurants",
  // there cannot be multiple restaurants due to the middleware
  validateRequestBody(restaurantsInsertSchema),
  async (req: Request, res: Response) => {
    // ts will not check any data type.
    // this is basically type assertion, makin this data from any become restaurantsSelect
    // any can be assigned to stricter data
    const restaurant: restaurantsSelect = req.body;
    let result: restaurantsSelect[] | null | number;
    result = await restaurantService.createRestaurant(restaurant);
    if (result === 0) {
      res.status(418).json("This restaurant name already exists");
    } else if (result === null) {
      res.status(500).send();
    } else {
      res.status(200).json(result);
    }
  }
);

app.post(
  "/employee",
  validateRequestBody(employeeInsertSchema),
  async (req: Request, res: Response) => {
    const employee: employeesSelect = req.body;
    const result = await restaurantService.createEmployee(employee);
    if (result === null) {
      res.status(400).json("Restaurant ID is wrong");
    } else if (result instanceof Error) {
      res.status(500).json(result);
    } else {
      res.status(200).json(result);
    }
  }
);

app.post(
  "/orders",
  validateRequestBody(createOrder),
  async (req: Request, res: Response) => {
    const result = await restaurantService.createOrders(req.body);
    if (result === 1) {
      res.status(201).send();
    } else if (typeof result === "string") {
      res.status(400).json(result);
    } else if (result === null) {
      res.status(500).send();
    }
  }
);

app.post("/customer", async (req: Request, res: Response) => {
  const { name } = req.body;

  const result = await restaurantService.createCustomer(name);
  result ? res.status(201).json(result) : res.status(404).send();
});

// id is not essential inside the payload to update.
app.put(
  "/restaurants/:id",
  validateRequestBody(restaurantsInsertSchema),
  async (req: Request, res: Response) => {
    const updateRestaurant = req.body;
    const { id } = req.params;

    const result = await restaurantService.updateRestaurant(
      updateRestaurant,
      parseInt(id)
    );

    result ? res.status(200).json(result) : res.status(404).send();
  }
);

app.delete("/restaurants/:id", async (req: Request, res: Response) => {
  const result = await restaurantService.deleteRestaurant(
    parseInt(req.params.id)
  );

  result ? res.status(200).json(result) : res.status(404).json(result);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error("An error occurred", { error: err.message, stack: err.stack });
  res.status(500).send();
});

export default app;
export type createOrderType = z.infer<typeof createOrder>;
