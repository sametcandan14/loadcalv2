import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Form,
  Row,
  Col,
  InputGroup,
  Container,
  Spinner,
  Table,
  Modal,
} from "react-bootstrap";
import { Plus, Pencil, Trash } from "react-bootstrap-icons";

interface BoxItem {
  id: number;
  name: string;
  width: number;
  height: number;
  length: number;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
const BOXES_API = `${API_BASE_URL}/boxes.php`;

const Boxes: React.FC = () => {
  const [boxes, setBoxes] = useState<BoxItem[]>([]);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [selectedBox, setSelectedBox] = useState<BoxItem | null>(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [boxToDelete, setBoxToDelete] = useState<BoxItem | null>(null);

  const [name, setName] = useState("");
  const [width, setWidth] = useState("");
  const [length, setLength] = useState("");
  const [height, setHeight] = useState("");

  useEffect(() => {
    fetchBoxes();
  }, []);

  const fetchBoxes = async () => {
    setLoading(true);
    try {
      const res = await axios.get(BOXES_API);
      setBoxes(res.data);
    } catch (err) {
      toast.error("Failed to fetch boxes.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!name.trim() || !width || !length || !height) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (Number(length) < Number(width)) {
      toast.warning("Length must be greater than or equal to Width.");
      return;
    }

    try {
      await axios.post(BOXES_API, {
        name: name.trim(),
        width: Number(width),
        length: Number(length),
        height: Number(height),
      });
      toast.success("Box added successfully");
      setName("");
      setWidth("");
      setLength("");
      setHeight("");
      fetchBoxes();
    } catch (err) {
      toast.error("Failed to add box");
      console.error(err);
    }
  };

  const confirmDelete = async () => {
    if (!boxToDelete) return;

    try {
      await axios.delete(`${BOXES_API}?id=${boxToDelete.id}`);
      toast.success("Box deleted");
      fetchBoxes();
    } catch (err) {
      toast.error("Failed to delete box");
      console.error(err);
    } finally {
      setShowDeleteModal(false);
      setBoxToDelete(null);
    }
  };

  const handleUpdate = async () => {
    if (!selectedBox) return;

    const { id, name, width, length, height } = selectedBox;

    if (!name.trim() || !width || !length || !height) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (length < width) {
      toast.warning("Length must be greater than or equal to Width.");
      return;
    }

    try {
      await axios.put(`${BOXES_API}?id=${id}`, {
        name: name.trim(),
        width,
        length,
        height,
      });
      toast.success("Box updated successfully");
      fetchBoxes();
      closeModal();
    } catch (err) {
      toast.error("Failed to update box");
      console.error(err);
    }
  };

  const openEditModal = (box: BoxItem) => {
    setSelectedBox({ ...box });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedBox(null);
  };

  return (
    <Container className="my-4">
      <h3 className="text-start">Add Box</h3>
      <Form className="mb-4">
        <Row className="align-items-center g-2">
          <Col xs={12} sm={4} md={3}>
            <Form.Control
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-label="Box Name"
            />
          </Col>
          <Col xs={4} sm={2} md={2}>
            <InputGroup>
              <Form.Control
                type="number"
                placeholder="Width (mm)"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                min={1}
                aria-label="Width"
              />
              <InputGroup.Text>mm</InputGroup.Text>
            </InputGroup>
          </Col>
          <Col xs={4} sm={2} md={2}>
            <InputGroup>
              <Form.Control
                type="number"
                placeholder="Length (mm)"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                min={1}
                aria-label="Length"
              />
              <InputGroup.Text>mm</InputGroup.Text>
            </InputGroup>
          </Col>
          <Col xs={4} sm={2} md={2}>
            <InputGroup>
              <Form.Control
                type="number"
                placeholder="Height (mm)"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                min={1}
                aria-label="Height"
              />
              <InputGroup.Text>mm</InputGroup.Text>
            </InputGroup>
          </Col>
          <Col xs="auto">
            <Button variant="success" onClick={handleAdd} aria-label="Add Box">
              <Plus className="me-1" /> Add
            </Button>
          </Col>
        </Row>
      </Form>

      <h3 className="text-start">Box List</h3>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Width (mm)</th>
              <th>Length (mm)</th>
              <th>Height (mm)</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {boxes.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center text-muted">
                  No boxes found.
                </td>
              </tr>
            ) : (
              boxes.map((b) => (
                <tr key={b.id}>
                  <td>{b.name}</td>
                  <td>{b.width}</td>
                  <td>{b.length}</td>
                  <td>{b.height}</td>
                  <td>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => openEditModal(b)}
                      aria-label={`Edit box ${b.name}`}
                    >
                      <Pencil />
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => {
                        setBoxToDelete(b);
                        setShowDeleteModal(true);
                      }}
                      aria-label={`Delete box ${b.name}`}
                    >
                      <Trash />
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Box</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBox && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedBox.name}
                  onChange={(e) =>
                    setSelectedBox({ ...selectedBox, name: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Width (mm)</Form.Label>
                <Form.Control
                  type="number"
                  value={selectedBox.width}
                  onChange={(e) =>
                    setSelectedBox({
                      ...selectedBox,
                      width: Number(e.target.value),
                    })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Length (mm)</Form.Label>
                <Form.Control
                  type="number"
                  value={selectedBox.length}
                  onChange={(e) =>
                    setSelectedBox({
                      ...selectedBox,
                      length: Number(e.target.value),
                    })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Height (mm)</Form.Label>
                <Form.Control
                  type="number"
                  value={selectedBox.height}
                  onChange={(e) =>
                    setSelectedBox({
                      ...selectedBox,
                      height: Number(e.target.value),
                    })
                  }
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Box</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {boxToDelete ? (
            <p>
              Are you sure you want to delete{" "}
              <strong>{boxToDelete.name}</strong>?
            </p>
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position="top-right" autoClose={3000} />
    </Container>
  );
};

export default Boxes;
