import exampleService from "../src/services/example.service";

describe("Example Service", () => {
  it("should be able to return a message", async () => {
    const message = await exampleService.getAll();
    expect(message).toBe("getAll");
  });

  it("should be able to create an example", async () => {
    const mockExample = {
      name: "example",
      description: "example description",
    };
    const example = await exampleService.createOne(mockExample);
    expect(example).toEqual(mockExample);
  });

  it("should be able to update an example", async () => {
    const mockExample = {
      name: "example",
      description: "example description",
    };
    const example = await exampleService.updateOne(mockExample);
    expect(example).toEqual(mockExample);
  });

  it("should be able to delete an example", async () => {
    const id = '1';
    const message = await exampleService.deleteOne(id);
    expect(message).toBe(id);
  });
});
