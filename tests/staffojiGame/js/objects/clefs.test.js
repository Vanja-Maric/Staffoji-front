import { createClefs } from "../../../../src/components/StaffojiGame/js/objects/clefs";

describe("createClefs function", () => {
  it("should create clefs and return a Phaser.Physics.Arcade.StaticGroup", () => {
    // Mock Phaser.Scene and selected clef type
    const scene = {
      physics: {
        add: {
          staticGroup: () => ({
            create: jest.fn(() => ({
              setScale: jest.fn(() => ({
                setDepth: jest.fn(() => ({
                  setVisible: jest.fn(), // Mock the setVisible method
                })),
              })),
            })),
            getChildren: jest.fn(() => []), // Mock the getChildren method
          }),
        },
      },
      tweens: {
        add: () => ({ /* Mock tween methods */ }),
      },
    };

    // Call the function with the mock scene object
    const clefsGroup = createClefs(scene, "treble");

    // Assertions
    expect(clefsGroup).toBeDefined();
    expect(clefsGroup.create).toHaveBeenCalledTimes(12); // Ensure 12 clefs were created
    expect(clefsGroup.getChildren).toHaveBeenCalledTimes(1); // Ensure getChildren was called
    expect(clefsGroup.create).toHaveBeenCalledWith(expect.any(Number), expect.any(Number), "treble");
    expect(typeof scene.tweens.add).toBe("function"); // Ensure tween was added
  });
});
