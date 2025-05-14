import unittest
import torch
from src.detector import ManholeDetector

class TestManholeDetector(unittest.TestCase):
    def setUp(self):
        self.detector = ManholeDetector()
    
    def test_model_structure(self):
        self.assertIsInstance(self.detector.model, torch.nn.Module)
    
    def test_detection(self):
        # TODO: Implement test cases
        pass
    
    def test_training(self):
        # TODO: Implement test cases
        pass

if __name__ == '__main__':
    unittest.main()
