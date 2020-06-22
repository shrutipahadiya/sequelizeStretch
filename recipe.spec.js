const Recipe = require('./recipe');
const db = require('./dbConfig');

describe('The Recipe Model', () => {
  beforeEach(() => {
    // clear the database before all tests
    return db.sync({ force: true });
  });

  afterEach(() => {
    // erase all tables after each spec
    return db.sync({ force: true });
  });

  test('The Recipe model is defined with a name column with type string.', async () => {
    const lasagne = await Recipe.create({ name: 'Lasagne' });
    expect(lasagne.name).toEqual('Lasagne');
  });
  test('The name column has a default value of cereal', async () => {
    const recipe = await Recipe.create({});
    expect(recipe.name).toEqual('cereal');
  });
  test('The name column does not allow empty strings.', async () => {
    await expect(Recipe.create({ name: '' })).rejects.toThrow();
  });
  test('The cook time column has a min value of 1 and a max value of 60', async () => {
    await expect(
      Recipe.create({ name: 'Tacos', cookTime: 1000 })
    ).rejects.toThrow();
    await expect(
      Recipe.create({ name: 'water', cookTime: 0 })
    ).rejects.toThrow();
  });
  test('The vegan column is a boolean', async () => {
    const burrito = await Recipe.create({
      name: 'burritos',
      cookTime: 10,
      vegan: true,
    });
    expect(burrito.vegan).toBe(true);
  });
  test('The food group column is the type enum.', async () => {
    const salad = await Recipe.create({
      name: 'salad',
      cookTime: 10,
      vegan: true,
      foodGroup: 'vegetable',
    });
    const steak = await Recipe.create({
      name: 'steak',
      cookTime: 20,
      vegan: false,
      foodGroup: 'meat',
    });
    const icecream = await Recipe.create({
      name: 'iceCream',
      cookTime: 2,
      vegan: false,
      foodGroup: 'dairy',
    });
    const bread = await Recipe.create({
      name: 'bread',
      cookTime: 50,
      vegan: true,
      foodGroup: 'grain',
    });
    const watermelon = await Recipe.create({
      name: 'watermelon',
      cookTime: 2,
      vegan: true,
      foodGroup: 'fruit',
    });

    await expect(
      Recipe.create({
        name: 'coffee',
        cookTime: 5,
        vegan: true,
        foodGroup: 'coffee',
      })
    ).rejects.toThrow();
  });
});
